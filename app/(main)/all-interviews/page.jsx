"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import supabase from "@/services/supabaseClient";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Plus } from "lucide-react";

function AllInterviewPage() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
    if (user?.email) {
      getInterviews();
    }
  }, [user]);

  const getInterviews = async () => {
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("userEmail", user?.email)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching interviews:", error);
      } else {
        setInterviewList(data);
      }
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  return (
    <div>
      <div className="my-5">
        <h2 className="font-bold text-2xl">All Previously Created Interviews</h2>

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
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllInterviewPage;
