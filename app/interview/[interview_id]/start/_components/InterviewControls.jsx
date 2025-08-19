"use client";
import { Mic, MicOff, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const InterviewControls = ({
  isCallActive,
  isMuted,
  isConnecting,
  hasInterviewCompleted,
  startInterview,
  endInterview,
  toggleMute,
}) => {
  const isMobile = useIsMobile();

  const getButtonSize = () => {
    return isMobile ? "w-16 h-16" : "w-12 h-12";
  };

  const getIconSize = () => {
    return isMobile ? "w-8 h-8" : "w-6 h-6";
  };

  const getSpacing = () => {
    return isMobile ? "gap-6" : "gap-5";
  };

  return (
    <div className={`flex items-center justify-center ${getSpacing()} mt-6 md:mt-7`}>
      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        disabled={!isCallActive}
        className={`${getButtonSize()} p-3 rounded-full cursor-pointer transition-colors ${
          isMuted
            ? "bg-red-500 text-white"
            : "bg-gray-500 text-white hover:bg-gray-600"
        } disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation`}
        aria-label={isMuted ? "Unmute microphone" : "Mute microphone"}
      >
        {isMuted ? (
          <MicOff className={getIconSize()} />
        ) : (
          <Mic className={getIconSize()} />
        )}
      </button>

      {/* Start/End Interview Button */}
      <button
        onClick={isCallActive ? endInterview : startInterview}
        disabled={isConnecting || (hasInterviewCompleted && !isCallActive)}
        className={`${getButtonSize()} p-3 rounded-full cursor-pointer transition-colors ${
          isCallActive
            ? "bg-red-500 text-white hover:bg-red-600"
            : hasInterviewCompleted
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        } disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation`}
        aria-label={
          isCallActive
            ? "End interview"
            : hasInterviewCompleted
            ? "Interview completed"
            : "Start interview"
        }
      >
        {isConnecting ? (
          <div className={`${getIconSize()} border-2 border-white border-t-transparent rounded-full animate-spin`}></div>
        ) : (
          <Phone className={getIconSize()} />
        )}
      </button>
    </div>
  );
};

export default InterviewControls;