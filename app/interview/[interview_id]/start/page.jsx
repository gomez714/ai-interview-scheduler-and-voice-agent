"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, MicOff, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import aiInterviewer from "@/public/woman-ai-interviewer.png";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGlobalTimer } from "@/hooks/useGlobalTimer";
import { useVapiInterview } from "@/hooks/useVapiInterview";
import FeedbackService from "@/utils/feedbackService";
import ThemeToggle from "../../_components/ThemeToggle";

const StartInterviewPage = React.memo(function StartInterviewPage() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  // Check if interview data is available
  React.useEffect(() => {
    if (!interviewInfo || !interviewInfo.interviewDetails) {
      // No interview data - redirect to error page
      router.push("/interview/error?type=not-found");
    }
  }, [interviewInfo, router]);

  // Don't render if no interview data
  if (!interviewInfo || !interviewInfo.interviewDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading interview...</p>
        </div>
      </div>
    );
  }

  // Use the global timer hook
  const { callDuration, startTimer, stopTimer, formatDuration, cleanup } =
    useGlobalTimer();

  // Debug timer state

  // Add useEffect to trace re-renders
  React.useEffect(() => {
    console.log("📊 START PAGE: useEffect triggered - component re-rendered");
  });

  // Only cleanup when component actually unmounts (not on re-renders)
  React.useEffect(() => {
    return () => {
      console.log("📊 START PAGE: FINAL UNMOUNT - calling cleanup");
      cleanup();
    };
  }, []); // Empty dependency array - only run on final unmount

  // Handle feedback generation using the service
  const handleFeedbackGeneration = async (conversationData) => {
    console.log(
      "Conversation history before feedback generation:",
      conversationData
    );

    try {
      await FeedbackService.generateAndSaveFeedback(
        conversationData,
        interviewInfo,
        router
      );
      toast.success("Interview feedback generated and saved successfully!");
    } catch (error) {
      console.error("Failed to generate feedback:", error);
      const errorMessage = FeedbackService.getErrorMessage(error);

      if (error.message === "No conversation data available for feedback") {
        toast.warning("No conversation data available for feedback");
      } else {
        toast.error(errorMessage);
      }

      // Always redirect to completed page regardless of feedback success/failure
      const interviewId = interviewInfo?.interviewDetails?.interview_id;
      if (router && interviewId) {
        router.replace(`/interview/${interviewId}/completed`);
      }
    }
  };

  // Memoize timer controls to prevent re-creation
  const timerControls = React.useMemo(
    () => ({
      startTimer: () => startTimer(interviewInfo),
      stopTimer,
      cleanup: () => {}, // Empty cleanup - let the timer manager handle its own lifecycle
    }),
    [startTimer, stopTimer, interviewInfo]
  );

  // Use the VAPI interview hook
  const {
    isCallActive,
    isMuted,
    isConnecting,
    conversationHistory,
    assistantIsSpeaking,
    hasInterviewCompleted,
    startInterview,
    endInterview,
    toggleMute,
  } = useVapiInterview(interviewInfo, handleFeedbackGeneration, timerControls);

  return (
    <div className="relative min-h-screen">
      {/* Theme Toggle - Top Right Corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="p-20 lg:px-48 xl:px-56">
        <h2 className="font-bold text-xl flex justify-between">
          AI Interview Session
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Timer />
            {formatDuration(callDuration)}
          </span>
        </h2>

        {/* Show completion message if interview is done */}
        {hasInterviewCompleted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Interview Completed
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>
                    Thank you for completing your interview. Your responses have
                    been recorded and feedback will be generated shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-2 gap-7">
          <div
            className={`bg-secondary h-[400px] rounded-lg border flex flex-col items-center justify-center gap-5 transition-all duration-300 ${
              assistantIsSpeaking ? "ring-2 ring-blue-500 bg-blue-50" : ""
            }`}
          >
            <Image
              alt="ai interviewer"
              src={aiInterviewer}
              width={100}
              height={100}
              className={`w-[60px] h-[60px] rounded-full object-cover transition-transform duration-300 ${
                assistantIsSpeaking ? "scale-110" : ""
              }`}
            />
            <h2>AI Interviewer</h2>
            {assistantIsSpeaking && (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            )}
          </div>
          <div className="bg-secondary h-[400px] rounded-lg border flex flex-col items-center justify-center gap-5">
            <h2 className="text-2xl font-bold bg-primary text-white rounded-full p-3 px-6">
              {interviewInfo?.username?.[0] || "U"}
            </h2>
            <h2>{interviewInfo?.username || "User"}</h2>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-5 mt-7">
          <button
            onClick={toggleMute}
            disabled={!isCallActive}
            className={`w-12 h-12 p-3 rounded-full cursor-pointer transition-colors ${
              isMuted
                ? "bg-red-500 text-white"
                : "bg-gray-500 text-white hover:bg-gray-600"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={isCallActive ? endInterview : startInterview}
            disabled={isConnecting || (hasInterviewCompleted && !isCallActive)}
            className={`w-12 h-12 p-3 rounded-full cursor-pointer transition-colors ${
              isCallActive
                ? "bg-red-500 text-white hover:bg-red-600"
                : hasInterviewCompleted
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isConnecting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Phone className="w-6 h-6" />
            )}
          </button>
        </div>

        <h2 className="text-sm text-muted-foreground text-center mt-5">
          {hasInterviewCompleted
            ? "Interview completed - Thank you for your time!"
            : isConnecting
            ? "Connecting to interview..."
            : isCallActive
            ? "Interview in progress..."
            : "Click the green button to start your interview"}
        </h2>
      </div>
    </div>
  );
});

export default StartInterviewPage;
