"use client";
import React, { useEffect, useState } from "react";
import supabase from "@/services/supabaseClient";
import { useUser } from "../AuthProvider";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import InterviewCardSkeleton from "@/components/ui/InterviewCardSkeleton";
import { useRouter } from "next/navigation";

function ScheduledInterviewsPage() {
  const { user, authChecked } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const getInterviewList = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const results = await supabase
        .from("interviews")
        .select(
          "jobPosition, duration, interview_id, created_at, interview_feedback(user_email)"
        )
        .eq("userEmail", user.email)
        .order("created_at", { ascending: false });
      setInterviewList(results.data || []);
    } catch (error) {
      console.error("Error fetching interviews:", error);
      setInterviewList([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (authChecked) {
      if (user?.email) {
        getInterviewList();
      } else {
        // No user email - clear list and stop loading
        setInterviewList([]);
        setLoading(false);
      }
    }
    // If authChecked is false, keep loading state
  }, [user?.email, authChecked]);
  return (
    <div className="mt-5">
      <h2 className="font-bold text-xl">
        Interview List with Feedback Results
      </h2>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <InterviewCardSkeleton key={index} showViewDetails={true} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && interviewList?.length === 0 && (
        <div className="bg-secondary border border-border rounded-xl p-8 flex flex-col items-center gap-4 mt-5">
          <div className="p-3 bg-background border border-border rounded-lg">
            <Video className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">No Scheduled Interviews Yet</h3>
            <p className="text-muted-foreground text-sm">
              Create your first interview to see it appear here with feedback results
            </p>
          </div>
          <Button className="mt-2 cursor-pointer" onClick={() => router.push("/dashboard/create-interview")}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Interview
          </Button>
        </div>
      )}

      {/* Interviews Grid */}
      {!loading && interviewList?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {interviewList.map((interview) => (
            <InterviewCard key={interview.interview_id} interview={interview} viewDetails={true} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterviewsPage;
