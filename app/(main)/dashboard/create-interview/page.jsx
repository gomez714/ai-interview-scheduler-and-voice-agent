"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";
import {useUser} from '../../AuthProvider'
function CreateInterviewPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const user = useUser();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onGoToNextStep = () => {
    if(user?.credits <= 0){
      toast.error("You have no credits left");
      return;
    }

    if (
      formData?.jobPosition === "" ||
      formData?.jobDescription === "" ||
      formData?.duration === "" ||
      formData?.interviewType.length === 0
    ) {
      return toast.error("Please fill all the fields");
    }
    setStep((prev) => prev + 1);
  };

  const onCreateInterviewLink = (interview_id, questionList) => {
    setInterviewId(interview_id);
    setQuestions(questionList);
    setStep((prev) => prev + 1);
  };

  return (
    <div className="mt-5 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex items-center gap-5">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step === 1 && (
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          goToNextStep={() => onGoToNextStep()}
        />
      )}
      {step === 2 && (
        <QuestionList
          formData={formData}
          onCreateInterviewLink={(interview_id, questionList) =>
            onCreateInterviewLink(interview_id, questionList)
          }
        />
      )}
      {step === 3 && (
        <InterviewLink 
          interviewId={interviewId} 
          formData={formData} 
          questions={questions}
        />
      )}
    </div>
  );
}

export default CreateInterviewPage;
