"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import LogoFull from "@/public/rolecall-logo-full.png";
import InterviewImage from "@/public/interview.jpg";
import { Clock, Info, Loader2, Video, CheckCircle, Mic, Globe, Volume2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import supabase from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import ThemeToggle from "../_components/ThemeToggle";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Theme Toggle - Top Right Corner */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <div className="inline-flex items-center justify-center p-3 bg-background border border-border rounded-xl mb-4 shadow-sm">
            <Image
              src={LogoFull}
              alt="RoleCall Logo"
              width={200}
              height={100}
              className="w-[200px] h-auto object-contain rounded-lg"
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-2">
            <Video className="h-4 w-4" />
            AI-Powered Interview Platform
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
          {/* Hero Image Section */}
          <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
            <Image
              src={InterviewImage}
              alt="Interview"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-foreground">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {interviewDetails?.jobPosition}
                </h1>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-background/90 backdrop-blur-sm border border-border rounded-full shadow-sm">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground text-sm">{interviewDetails?.duration} Minutes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Pre-Interview Checklist */}
            <div className="mb-8">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Info className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Before you begin
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Mic className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Test Microphone</p>
                          <p className="text-xs text-muted-foreground">Ensure audio works</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Globe className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Stable Connection</p>
                          <p className="text-xs text-muted-foreground">Check your internet</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-background border border-border rounded-lg">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Volume2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Quiet Environment</p>
                          <p className="text-xs text-muted-foreground">Find a quiet space</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Ready to get started?
                </h2>
                <p className="text-muted-foreground">
                  Please provide your details to begin the interview
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. John Smith"
                    className="h-12 bg-background border-border"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="e.g. johnsmith@gmail.com"
                    className="h-12 bg-background border-border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <Button
                className="w-full h-12 gap-2 text-base cursor-pointer font-semibold bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90"
                disabled={isLoading || !username || !email}
                onClick={handleJoinInterview}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Joining Interview...
                  </>
                ) : (
                  <>
                    <Video className="h-5 w-5" />
                    Join Interview
                  </>
                )}
              </Button>

              {(!username || !email) && (
                <p className="text-xs text-muted-foreground text-center">
                  Please fill in all fields to continue
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Powered by RoleCall AI Interview Platform
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
