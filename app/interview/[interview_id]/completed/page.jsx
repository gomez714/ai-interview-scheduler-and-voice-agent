"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import {
  CheckCircle,
  Trophy,
  TrendingUp,
  Home,
  RefreshCw,
  FileText,
  Target,
  Brain,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoFull from "@/public/rolecall-logo-full.png";
import ThemeToggle from "../../_components/ThemeToggle";

function InterviewCompletedPage() {
  const router = useRouter();
  const { interview_id } = useParams();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation on mount
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const navigateToDashboard = () => {
    router.push('/dashboard');
  };

  const startNewInterview = () => {
    router.push('/dashboard/create-interview');
  };

  const viewInterviewResults = () => {
    router.push('/interview-results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 animate-pulse">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

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
            <Brain className="h-4 w-4" />
            AI-Powered Mock Interview Practice
          </div>
        </div>

        {/* Main Success Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Success Hero Section */}
          <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 via-transparent to-green-100/50 dark:from-green-900/30 dark:via-transparent dark:to-green-900/30"></div>
            <div className="relative">
              {/* Animated Success Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/50 border-4 border-green-200 dark:border-green-700 rounded-full mb-6">
                <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Great Job! Interview Practice Complete! 🎉
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You've successfully completed your mock interview session. Our AI is analyzing your performance to provide personalized feedback and improvement suggestions.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* What's Next Section */}
            <div className="mb-8">
              <div className="bg-secondary/30 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">What's Happening Now</h2>
                    <p className="text-muted-foreground">Your journey to interview mastery continues</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* AI Analysis */}
                  <div className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">AI Analysis in Progress</h3>
                    <p className="text-sm text-muted-foreground">
                      Our advanced AI is analyzing your responses, communication style, and technical accuracy to generate personalized feedback
                    </p>
                    <div className="mt-3">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-3 w-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-blue-600 dark:text-blue-400">Analyzing responses...</span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Ready */}
                  <div className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Detailed Feedback Ready Soon</h3>
                    <p className="text-sm text-muted-foreground">
                      You'll receive comprehensive feedback including strengths, areas for improvement, and personalized practice recommendations
                    </p>
                    <div className="mt-3">
                      <div className="text-sm text-green-600 dark:text-green-400">
                        ⏱️ Ready in 2-3 minutes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Button 
                onClick={navigateToDashboard}
                className="cursor-pointer h-16 flex flex-col gap-2 bg-primary hover:bg-primary/90"
              >
                <Home className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </Button>
              
              <Button 
                onClick={startNewInterview}
                variant="outline"
                className="cursor-pointer h-16 flex flex-col gap-2 border-primary text-primary hover:bg-primary/10"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Practice Again</span>
              </Button>

              <Button 
                onClick={viewInterviewResults}
                variant="outline"
                className="cursor-pointer h-16 flex flex-col gap-2"
              >
                <FileText className="h-5 w-5" />
                <span>View Results</span>
              </Button>
            </div>

            {/* Motivational Section */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Every Practice Session Makes You Stronger! 💪
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                You're building valuable interview skills with each session. Keep practicing to boost your confidence and land your dream job!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Powered by RoleCall AI • Your Personal Interview Coach
          </p>
        </div>
      </div>
    </div>
  );
}

export default InterviewCompletedPage;
