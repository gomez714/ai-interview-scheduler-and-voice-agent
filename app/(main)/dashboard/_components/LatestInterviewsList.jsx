"use client";
import { Button } from "@/components/ui/button";
import { Video, Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useUser } from "../../AuthProvider";
import supabase from "@/services/supabaseClient";
import InterviewCard from "./InterviewCard";
import InterviewCardSkeleton from "@/components/ui/InterviewCardSkeleton";

function LatestInterviewsList() {
  const [interviewList, setInterviewList] = useState([]);
  const { user, authChecked } = useUser();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  // Component mount/unmount tracking
  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  useEffect(() => {
    if (authChecked) {
      if (user?.email) {
        getInterviews();
      } else {
        // No user email - clear list and stop loading
        setInterviewList([]);
        setLoading(false);
      }
    }
    // If authChecked is false, keep loading state
  }, [user?.email, authChecked]);

  const getInterviews = async () => {
    if (!user?.email) {
      if (mounted) setLoading(false);
      return;
    }
    
    try {
      if (mounted) setLoading(true);
      
      const { data, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("userEmail", user.email)
        .order("created_at", { ascending: false })
        .limit(6);
        
      // Check if component is still mounted before updating state
      if (!mounted) return;
        
      if (error) {
        console.error("Error fetching interviews:", error);
        setInterviewList([]);
      } else {
        setInterviewList(data || []);
      }
    } catch (networkError) {
      if (!mounted) return;
      console.error("Network error:", networkError);
      setInterviewList([]);
    } finally {
      if (mounted) {
        setLoading(false);
      }
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
