"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import InterviewCard from "../dashboard/_components/InterviewCard";

function ScheduledInterviewsPage() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  const getInterviewList = async () => {
    const results = await supabase
      .from("interviews")
      .select(
        "jobPosition, duration, interview_id, interview_feedback(user_email)"
      )
      .eq("userEmail", user?.email)
      .order("created_at", { ascending: false });
    setInterviewList(results.data);
  };
  useEffect(() => {
    user && getInterviewList();
  }, [user]);
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">
        Interview List with Candidate Feedback
      </h2>
      {interviewList?.length === 0 && (
        <div className="p-5 flex flex-col items-center gap-3 mt-5">
          <Video className="h-12 w-12 p-2 text-primary bg-blue-100 rounded-lg" />
          <h2 className="font-bold">No Interviews Created Yet</h2>
          <Button>
            <Plus />
            Create New Interview
          </Button>
        </div>
      )}

      {interviewList?.length > 0 && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {interviewList.map((interview) => (
            <InterviewCard key={interview.interview_id} interview={interview} viewDetails={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterviewsPage;
