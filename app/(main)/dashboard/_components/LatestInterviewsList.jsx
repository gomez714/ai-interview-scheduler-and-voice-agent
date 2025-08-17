"use client";
import { Button } from "@/components/ui/button";
import { Video, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/provider";
import supabase from "@/services/supabaseClient";
import InterviewCard from "./InterviewCard";
import InterviewCardSkeleton from "@/components/ui/InterviewCardSkeleton";

function LatestInterviewsList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    if (user?.email ) {
      getInterviews();
    }
  }, [user]);

  const getInterviews = async () => {
    try {
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("userEmail", user?.email)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) {
        console.error("Error fetching interviews:", error);
      }
      setInterviewList(data);
    } catch (networkError) {
      console.error("Network error:", networkError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="my-5">
        <h2 className="font-bold text-2xl">Previously Created Interviews</h2>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <InterviewCardSkeleton key={index} />
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
              <h3 className="text-lg font-semibold text-foreground">No Interviews Created Yet</h3>
              <p className="text-muted-foreground text-sm">
                Get started by creating your first AI-powered interview
              </p>
            </div>
            <Button className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Create New Interview
            </Button>
          </div>
        )}

        {/* Interviews Grid */}
        {!loading && interviewList?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {interviewList.map((interview) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LatestInterviewsList;
