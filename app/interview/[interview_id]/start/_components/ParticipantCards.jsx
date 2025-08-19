"use client";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import aiInterviewer from "@/public/woman-ai-interviewer.png";

const ParticipantCards = ({ interviewInfo, assistantIsSpeaking }) => {
  const isMobile = useIsMobile();

  const getCardHeight = () => {
    return isMobile ? "min-h-[280px]" : "h-[400px]";
  };

  const getImageSize = () => {
    return isMobile ? "w-[50px] h-[50px]" : "w-[60px] h-[60px]";
  };

  const getGridLayout = () => {
    return isMobile ? "grid-cols-1 gap-4" : "grid-cols-2 gap-7";
  };

  const getTextSize = () => {
    return isMobile ? "text-lg" : "text-xl";
  };

  const getUserInitialSize = () => {
    return isMobile ? "text-xl" : "text-2xl";
  };

  const getUserInitialPadding = () => {
    return isMobile ? "p-2 px-4" : "p-3 px-6";
  };

  return (
    <div className={`grid ${getGridLayout()}`}>
      {/* AI Interviewer Card */}
      <div
        className={`bg-secondary ${getCardHeight()} rounded-lg border flex flex-col items-center justify-center gap-4 md:gap-5 transition-all duration-300 ${
          assistantIsSpeaking ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-950" : ""
        }`}
      >
        <Image
          alt="AI interviewer"
          src={aiInterviewer}
          width={isMobile ? 50 : 60}
          height={isMobile ? 50 : 60}
          className={`${getImageSize()} rounded-full object-cover transition-transform duration-300 ${
            assistantIsSpeaking ? "scale-110" : ""
          }`}
          priority
        />
        <h2 className={`font-medium ${getTextSize()} text-center px-2`}>
          AI Interviewer
        </h2>
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

      {/* User Card */}
      <div className={`bg-secondary ${getCardHeight()} rounded-lg border flex flex-col items-center justify-center gap-4 md:gap-5`}>
        <div className={`${getUserInitialSize()} font-bold bg-primary text-white rounded-full ${getUserInitialPadding()}`}>
          {interviewInfo?.username?.[0]?.toUpperCase() || "U"}
        </div>
        <h2 className={`font-medium ${getTextSize()} text-center px-2`}>
          {interviewInfo?.username || "User"}
        </h2>
      </div>
    </div>
  );
};

export default ParticipantCards;