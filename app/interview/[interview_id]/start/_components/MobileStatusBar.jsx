"use client";
import { Timer } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileStatusBar = ({ 
  callDuration, 
  formatDuration, 
  isCallActive,
  isConnecting,
  hasInterviewCompleted 
}) => {
  const isMobile = useIsMobile();

  const getStatusMessage = () => {
    if (hasInterviewCompleted) {
      return "Interview completed - Thank you for your time!";
    }
    if (isConnecting) {
      return "Connecting to interview...";
    }
    if (isCallActive) {
      return "Interview in progress...";
    }
    return "Click the green button to start your interview";
  };

  const getHeaderTextSize = () => {
    return isMobile ? "text-lg" : "text-xl";
  };

  const getTimerTextSize = () => {
    return isMobile ? "text-xs" : "text-sm";
  };

  const getStatusTextSize = () => {
    return isMobile ? "text-xs" : "text-sm";
  };

  const getHeaderLayout = () => {
    return isMobile ? "flex-col space-y-2" : "flex-row justify-between";
  };

  return (
    <>
      {/* Header with Timer */}
      <div className={`font-bold ${getHeaderTextSize()} flex ${getHeaderLayout()} items-center mb-6 md:mb-4`}>
        <h1 className="text-center md:text-left">AI Interview Session</h1>
        <div className={`flex items-center justify-center md:justify-start gap-2 ${getTimerTextSize()} text-muted-foreground`}>
          <Timer className="w-4 h-4" />
          <span className="font-mono">{formatDuration(callDuration)}</span>
        </div>
      </div>

      {/* Status Message */}
      <div className={`${getStatusTextSize()} text-muted-foreground text-center mt-4 md:mt-5 px-4 md:px-0`}>
        {getStatusMessage()}
      </div>
    </>
  );
};

export default MobileStatusBar;