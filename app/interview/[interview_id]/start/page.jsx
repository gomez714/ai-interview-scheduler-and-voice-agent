"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import aiInterviewer from "@/public/woman-ai-interviewer.png";
function StartInterviewPage() {
  const { interviewInfo } = useContext(InterviewDataContext);
  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Session
        <span className="flex items-center gap-2 text-sm text-gray-500">
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-7">
        <div className="bg-secondary h-[300px] rounded-lg border flex flex-col items-center justify-center gap-5">
          <Image
            alt="ai interviewer"
            src={aiInterviewer}
            width={100}
            height={100}
            className="w-[60px] h-[60px] rounded-full object-cover"
          />
          <h2>AI Interviewer</h2>
        </div>
        <div className="bg-secondary h-[300px] rounded-lg border flex flex-col items-center justify-center gap-5">
          <h2 className="text-2xl font-bold bg-primary text-white rounded-full p-3 px-6">{interviewInfo?.username[0]}</h2>
        <h2>{interviewInfo?.username}</h2>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 mt-7">
        <Mic className="w-12 h-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer"/>
        <Phone className="w-12 h-12 p-3 text-white bg-red-500 rounded-full cursor-pointer"/>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">Interview in progress...</h2>
    </div>
  );
}

export default StartInterviewPage;
