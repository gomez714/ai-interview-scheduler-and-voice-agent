"use client";
import React from "react";
import Image from "next/image";
import {
  CheckCircle,
  Clock,
  Mail,
  Calendar,
  FileText,
  ArrowLeft,
  Sparkles,
  MessageSquare,
  BarChart3,
  Timer,
  Users,
} from "lucide-react";
import LogoFull from "@/public/rolecall-logo-full.png";
import ThemeToggle from "../../_components/ThemeToggle";


function InterviewCompletedPage() {

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
            <Sparkles className="h-4 w-4" />
            AI-Powered Interview Platform
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
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Interview Completed Successfully!
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Thank you for participating in the interview. Your responses have been successfully recorded and our AI is now generating detailed feedback.
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Process Timeline */}
            <div className="mb-8">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">What Happens Next</h2>
                    <p className="text-muted-foreground">Your interview journey continues</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          1
                        </div>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">AI Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced AI system analyzes your responses for comprehensive insights and scoring
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <div className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          2
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Recruiter Review</h3>
                      <p className="text-sm text-muted-foreground">
                        Hiring team reviews AI insights along with your interview performance
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <div className="bg-background border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          3
                        </div>
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Mail className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Follow-up Communication</h3>
                      <p className="text-sm text-muted-foreground">
                        You'll receive next steps within 3-5 business days via email
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Information Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Processing Status */}
              <div className="bg-secondary/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Timer className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Processing Status</h3>
                    <p className="text-sm text-muted-foreground">Currently analyzing your responses</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-muted-foreground">Interview recorded successfully</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-muted-foreground">AI analysis in progress</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-secondary/50 border border-border rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Need Assistance?</h3>
                    <p className="text-sm text-muted-foreground">We're here to help</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Questions about your interview or the process? Contact the recruiting team who scheduled this session.
                </p>
              </div>
            </div>

            {/* Security & Privacy Note */}
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>Your interview data is securely encrypted and stored. No further action required.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Powered by RoleCall AI Interview Platform
          </p>
        </div>
      </div>
    </div>
  );
}

export default InterviewCompletedPage;
