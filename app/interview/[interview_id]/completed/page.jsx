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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoFull from "@/public/rolecall-logo-full.png";
import { useRouter } from "next/navigation";

function InterviewCompletedPage() {
  const router = useRouter();

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-16">
      <div className="flex flex-col items-center justify-center border rounded-lg p-7 bg-secondary lg:px-32 xl:px-52">
        <Image
          src={LogoFull}
          alt="Rolecall Logo"
          className="w-50 h-auto rounded-sm"
        />
        <h2 className="mt-3 font-semibold">AI-Powered Interview Platform</h2>

        {/* Success Icon */}
        <div className="mt-8 mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Interview Completed!
        </h1>

        {/* Thank You Message */}
        <p className="text-lg text-center text-gray-600 mb-8 max-w-md">
          Thank you for participating in the interview. Your responses have been
          successfully recorded and are being processed.
        </p>

        {/* What's Next Section */}
        <div className="w-full max-w-2xl bg-blue-100 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            What's Next
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Review & Analysis</h3>
                <p className="text-sm text-gray-600">
                  Our AI system is analyzing your responses to generate
                  comprehensive feedback
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Recruiter Review</h3>
                <p className="text-sm text-gray-600">
                  The recruiter will review your interview responses and
                  AI-generated insights
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  Next Steps Communication
                </h3>
                <p className="text-sm text-gray-600">
                  You will be contacted regarding the next steps in the hiring
                  process within 3-5 business days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="w-full max-w-2xl bg-yellow-50 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-yellow-600" />
            <h3 className="font-medium text-gray-800">
              Questions or Concerns?
            </h3>
          </div>
          <p className="text-sm text-gray-600">
            If you have any questions about your interview or the process,
            please don't hesitate to reach out to the recruiting team who
            scheduled this interview.
          </p>
        </div>
        
        {/* Footer Message */}
        <p className="text-xs text-gray-500 text-center mt-6 max-w-md">
          Your interview session has been securely saved. No further action is
          required from you at this time.
        </p>
      </div>
    </div>
  );
}

export default InterviewCompletedPage;
