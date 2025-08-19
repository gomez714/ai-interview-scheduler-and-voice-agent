"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import React, { useContext } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGlobalTimer } from "@/hooks/useGlobalTimer";
import { useVapiInterview } from "@/hooks/useVapiInterview";
import FeedbackService from "@/utils/feedbackService";
import ThemeToggle from "../../_components/ThemeToggle";
import InterviewControls from "./_components/InterviewControls";
import ParticipantCards from "./_components/ParticipantCards";
import MobileStatusBar from "./_components/MobileStatusBar";

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

      <div className="p-4 sm:p-6 md:p-8 lg:px-48 xl:px-56 max-w-7xl mx-auto">
        {/* Mobile Status Bar */}
        <MobileStatusBar
          callDuration={callDuration}
          formatDuration={formatDuration}
          isCallActive={isCallActive}
          isConnecting={isConnecting}
          hasInterviewCompleted={hasInterviewCompleted}
        />

        {/* Show completion message if interview is done */}
        {hasInterviewCompleted && (
          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
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
                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Interview Completed
                </h3>
                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                  <p>
                    Thank you for completing your interview. Your responses have
                    been recorded and feedback will be generated shortly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Participant Cards */}
        <ParticipantCards
          interviewInfo={interviewInfo}
          assistantIsSpeaking={assistantIsSpeaking}
        />

        {/* Interview Controls */}
        <InterviewControls
          isCallActive={isCallActive}
          isMuted={isMuted}
          isConnecting={isConnecting}
          hasInterviewCompleted={hasInterviewCompleted}
          startInterview={startInterview}
          endInterview={endInterview}
          toggleMute={toggleMute}
        />
      </div>
    </div>
  );
});

export default StartInterviewPage;
