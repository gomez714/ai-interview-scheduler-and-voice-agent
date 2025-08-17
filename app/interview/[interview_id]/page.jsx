"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import LogoFull from "@/public/rolecall-logo-full.png";
import InterviewImage from "@/public/interview.jpg";
import { Clock, Info, Loader2, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";

function Page() {
  const { interview_id } = useParams();
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();
  const getInterviewDetails = async () => {
    setIsInitialLoading(true);
    try {
      let { data: interviews, error } = await supabase
        .from("interviews")
        .select("jobPosition, jobDescription, duration")
        .eq("interview_id", interview_id);

      if (error) {
        console.error("Database error:", error);
        router.push("/interview/error?type=network");
        return;
      }

      if (!interviews?.length) {
        // Interview not found - redirect to error page
        router.push("/interview/error?type=not-found");
        return;
      }
      
      setInterviewDetails(interviews[0]);
    } catch (error) {
      console.error("Network error:", error);
      router.push("/interview/error?type=network");
    } finally {
      setIsInitialLoading(false);
    }
  };

  const handleJoinInterview = async () => {
    setIsLoading(true);
    try {
      let { data: interviews, error } = await supabase
        .from("interviews")
        .select("*")
        .eq("interview_id", interview_id);

      if (interviews && interviews.length > 0) {
        setInterviewInfo({
          username: username,
          email: email,
          interviewDetails: interviews[0],
        });
        router.push(`/interview/${interview_id}/start`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error joining interview");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (interview_id) {
      getInterviewDetails();
    } else {
      // No interview_id provided
      router.push("/interview/error?type=not-found");
    }
  }, [interview_id]);

  // Show loading state while checking interview validity
  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading interview...</p>
        </div>
      </div>
    );
  }

  // If we get here and no interview details, something went wrong
  if (!interviewDetails) {
    return null; // Router.push should have already redirected
  }
  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-16">
      <div className="flex flex-col items-center justify-center border rounded-lg p-7 bg-secondary lg:px-32 xl:px-52">
        <Image
          src={LogoFull}
          alt="Rolecall Logo"
          className="w-50 h-auto rounded-sm"
        />
        <h2 className="mt-3 font-semibold">AI-Powered Interview Platform</h2>

        <Image
          src={InterviewImage}
          alt="Interview"
          className="w-3/4 h-auto rounded-sm my-6"
        />
        <h2 className="font-semibold text-xl">
          {interviewDetails?.jobPosition} - Interview
        </h2>
        <h2 className="flex items-center gap-2 text-sm text-gray-500 mt-4">
          <Clock />
          {interviewDetails?.duration} Minutes
        </h2>
        <div className="mt-4 p-3 bg-blue-100 flex gap-4 rounded-lg">
          <Info className="text-blue-700" />
          <div>
            <h2 className="font-semibold">Before you begin:</h2>
            <ul className="list-disc list-inside">
              <li className="text-sm text-blue-700">Test your microphone</li>
              <li className="text-sm text-blue-700">
                Make sure you have a stable internet connection
              </li>
              <li className="text-sm text-blue-700">
                Make sure you have a quiet environment
              </li>
            </ul>
          </div>
        </div>
        <div className="w-3/4 mt-4">
          <h2>Enter your full name</h2>
          <Input
            type="text"
            placeholder="e.g. John Smith"
            className="bg-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="w-3/4 mt-4">
          <h2>Enter your email</h2>
          <Input
            type="email"
            placeholder="e.g. johnsmith@gmail.com"
            className="bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <Button
          className="mt-5 w-3/4 font-bold"
          disabled={isLoading || !username}
          onClick={handleJoinInterview}
        >
          <Video />
          {isLoading ? <Loader2 className="animate-spin" /> : "Join Interview"}
        </Button>
      </div>
    </div>
  );
}

export default Page;
