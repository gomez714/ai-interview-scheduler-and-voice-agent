"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import InterviewDetailsContainer from "./_components/InterviewDetailsContainer";
import CandidatesList from "./_components/CandidatesList";
function InterviewDetailsPage() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetails, setInterviewDetails] = useState(null);
  const getInterviewDetails = async () => {
    const { data, error } = await supabase
      .from("interviews")
      .select(
        "jobPosition, created_at, duration, interview_id, jobDescription, questionList, interviewType, interview_feedback(user_email, username, feedback, created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);

    if (error) {
      console.log(error);
    }
    setInterviewDetails(data[0]);
  };

  useEffect(() => {
    user && getInterviewDetails();
  }, [interview_id, user]);

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDetailsContainer interviewDetails={interviewDetails} />
      <CandidatesList candidateList={interviewDetails?.['interview_feedback']}/>
    </div>
  );
}

export default InterviewDetailsPage;
