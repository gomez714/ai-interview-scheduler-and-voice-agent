import { useState, useEffect, useRef, useCallback } from "react";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export const useVapiInterview = (interviewInfo, onFeedbackGeneration, timerControls) => {
  // VAPI State Management
  const [vapi, setVapi] = useState(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const latestConversationRef = useRef([]);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
  const [hasInterviewCompleted, setHasInterviewCompleted] = useState(false);

  const { startTimer, stopTimer, cleanup: timerCleanup } = timerControls;

  // Initialize VAPI instance with error handling
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

    if (!publicKey) {
      console.error("VAPI public key not found");
      toast.error("Configuration error: VAPI key missing");
      return;
    }

    try {
      const vapiInstance = new Vapi(publicKey);
      setVapi(vapiInstance);
    } catch (error) {
      console.error("Failed to initialize VAPI:", error);
      toast.error("Failed to initialize voice service");
    }
  }, []);

  // Create assistant configuration
  const createAssistantConfig = useCallback(() => {
    const interviewDetails = interviewInfo?.interviewDetails;

    if (!interviewDetails) {
      throw new Error("Interview details not available");
    }

    // Extract questions from questionList
    const questions = interviewDetails.questionList || [];

    // Format questions for the system prompt
    const formattedQuestions = questions
      .map((q, index) => {
        return `${index + 1}. [${q.type}] ${q.question}
   Topic: ${q.topic || "General"}
   Difficulty: ${q.difficulty || "medium"}
   Time: ${q.estimated_time_min || 3} minutes
   Follow-ups: ${q.follow_ups?.join(", ") || "None"}
   Good answers should include: ${
     q.what_good_answers_include?.join(", ") ||
     "Relevant experience and examples"
   }
   Red flags: ${q.red_flags?.join(", ") || "Vague or irrelevant responses"}`;
      })
      .join("\n\n");

    return {
      // First message that the assistant will say
      firstMessage: `Hello ${interviewInfo.username}! Welcome to your ${interviewDetails.jobPosition} interview. I'm your AI interviewer and I'll be conducting this ${interviewDetails.duration}-minute interview session with ${questions.length} carefully prepared questions. Are you ready to begin?`,

      // Set max duration in seconds
      maxDurationSeconds: interviewDetails.duration * 60,

      // Model configuration with system prompt
      model: {
        provider: "openai",
        model: "gpt-4o-mini",
        temperature: 0.5,
        systemPrompt: `You are a professional AI interviewer conducting a ${interviewDetails.jobPosition} interview. 

          Interview Details:
          - Position: ${interviewDetails.jobPosition}
          - Duration: ${interviewDetails.duration} minutes (SYSTEM WILL AUTO-END AT TIME LIMIT)
          - Candidate: ${interviewInfo.username}
          - Job Description: ${interviewDetails.jobDescription}
          - Total Questions: ${questions.length}

          CRITICAL TIME MANAGEMENT:
          - The system will automatically end this call at exactly ${interviewDetails.duration} minutes
          - Monitor the pace carefully - you MUST complete the interview before auto-termination
          - If running behind, prioritize the most important questions
          - Always leave 2-3 minutes for proper closing remarks
          - If you sense time is running short, say: "I notice we're running short on time, let me ask the most important remaining question"

          SPECIFIC INTERVIEW QUESTIONS TO ASK:
          ${formattedQuestions}

          INTERVIEW FLOW STRATEGY:
          1. Start immediately with question #1 after brief greeting
          2. Keep your responses concise to maximize candidate talking time  
          3. After each answer, quickly transition: "Great, moving to the next question..."
          4. If candidate gives short answers, use follow-ups efficiently
          5. Around the midpoint, briefly check pace: "We're making good progress"
          6. In final 5 minutes, begin wrapping up and ask for final thoughts
          7. End with professional closing before system termination

          RESPONSE GUIDELINES:
          - Be encouraging but efficient with your words
          - Don't let pauses drag - gently prompt after 3-4 seconds
          - If candidate goes off-topic, politely redirect: "That's interesting, let me bring us back to..."
          - Keep the energy positive and professional throughout

          Remember: The system will cut us off at ${interviewDetails.duration} minutes regardless, so pace yourself accordingly!`,
      },

      // Voice configuration
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },

      // Transcriber configuration
      transcriber: {
        provider: "deepgram",
        model: "nova-3",
        language: "en-US",
        smartFormat: true,
      },

      // End call message
      endCallMessage: `Thank you ${interviewInfo.username} for your time today. This concludes our interview for the ${interviewDetails.jobPosition} position. We covered ${questions.length} questions and I enjoyed learning about your experience. You should hear back from our team within the next few business days. Have a great day!`,
    };
  }, [interviewInfo]);

  // Event handlers
  const handleCallStart = useCallback(() => {
    setIsCallActive(true);
    setIsConnecting(false);
    
    // Add a small delay to prevent immediate cleanup in React Strict Mode
    setTimeout(() => {
      startTimer();
    }, 100);
    
    toast.success("Interview started!");
  }, [startTimer]);

  const handleCallEnd = useCallback(async () => {
    setIsCallActive(false);
    setIsConnecting(false);
    setAssistantIsSpeaking(false);
    setHasInterviewCompleted(true);
    stopTimer();
    toast.info("Interview completed - Thank you!");
    
    if (latestConversationRef.current && latestConversationRef.current.length > 0) {
      await onFeedbackGeneration(latestConversationRef.current);
    } else {
      console.warn("No conversation data available for feedback");
    }
  }, [stopTimer, onFeedbackGeneration]);

  const handleSpeechStart = useCallback(() => {
  }, []);

  const handleSpeechEnd = useCallback(() => {
  }, []);

  const handleMessage = useCallback((message) => {

    // Update conversation history state
    if (message.type === "conversation-update") {
      setConversationHistory((prev) => [...prev, message]);
      // Update the ref instead of local variable
      latestConversationRef.current = message.conversation || [];
    }

    if (message.type === "assistant-speech-started") {
      setAssistantIsSpeaking(true);
    }

    if (message.type === "assistant-speech-ended") {
      setAssistantIsSpeaking(false);
    }

    // Handle status updates including duration exceeded
    if (message.type === "status-update") {
      if (message.status === "ended") {
        if (message.endedReason === "exceeded-max-duration") {
          toast.info("Interview completed - Time limit reached");
        } else {
          toast.info(`Interview ended: ${message.endedReason}`);
        }
      }
    }

    // Handle transcript messages for better UX
    if (message.type === "transcript") {
      if (message.role === "user" && message.transcriptType === "final") {
        // You could store these for interview records
      }
    }
  }, []);

  const handleError = useCallback((error) => {
    console.error("VAPI Error:", error);
    setIsConnecting(false);
    setIsCallActive(false);
    toast.error(`Voice service error: ${error.message}`);
  }, []);

  // Setup VAPI event listeners
  useEffect(() => {
    if (!vapi) return;

    // Add event listeners
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("message", handleMessage);
    vapi.on("error", handleError);

    // Cleanup listeners
    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("message", handleMessage);
      vapi.off("error", handleError);
      
      // Cleanup timer on component unmount
      timerCleanup();
    };
  }, [vapi, handleCallStart, handleCallEnd, handleSpeechStart, handleSpeechEnd, handleMessage, handleError, timerCleanup]);

  // Interview control functions
  const startInterview = useCallback(async () => {
    // Prevent starting if interview has already been completed
    if (hasInterviewCompleted) {
      toast.error("This interview has already been completed. You cannot start a new session.");
      return;
    }

    if (!vapi) {
      toast.error("Voice service not initialized");
      return;
    }

    if (!interviewInfo || !interviewInfo.interviewDetails) {
      toast.error("Interview information not available");
      return;
    }

    try {
      setIsConnecting(true);
      const assistantConfig = createAssistantConfig();

      await vapi.start(assistantConfig);

      // Set up automatic call termination
      const maxDuration = interviewInfo.interviewDetails.duration * 60 * 1000;
      setTimeout(() => {
        if (isCallActive) {
          endInterview();
          toast.info("Interview time limit reached");
        }
      }, maxDuration);
    } catch (error) {
      console.error("Failed to start interview:", error);
      setIsConnecting(false);
      toast.error("Failed to start interview. Please try again.");
    }
  }, [vapi, interviewInfo, hasInterviewCompleted, createAssistantConfig, isCallActive]);

  const endInterview = useCallback(async () => {
    if (!vapi || !isCallActive) return;

    try {
      await vapi.stop();
      stopTimer();
      setHasInterviewCompleted(true);
    } catch (error) {
      console.error("Failed to end interview:", error);
      toast.error("Failed to end interview properly");
    }
  }, [vapi, isCallActive, stopTimer]);

  const toggleMute = useCallback(() => {
    if (!vapi) return;

    const newMutedState = !isMuted;
    vapi.setMuted(newMutedState);
    setIsMuted(newMutedState);
    toast.info(newMutedState ? "Microphone muted" : "Microphone unmuted");
  }, [vapi, isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timerCleanup();
      if (vapi && isCallActive) {
        vapi.stop();
      }
    };
  }, [vapi, isCallActive, timerCleanup]);

  return {
    // State
    isCallActive,
    isMuted,
    isConnecting,
    conversationHistory,
    assistantIsSpeaking,
    hasInterviewCompleted,
    
    // Actions
    startInterview,
    endInterview,
    toggleMute,
  };
};