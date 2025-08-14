import React from "react";
import Image from "next/image";
import LogoBlue from "@/public/rolecall-logo-blue.png";
function InterviewHeader() {
  return (
    <div className="p-4 shadow-md">
      <Image src={LogoBlue} alt="Rolecall Logo" className="w-50 h-auto" />
    </div>
  );
}

export default InterviewHeader;
