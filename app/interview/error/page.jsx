"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Mail, RefreshCw, Home } from "lucide-react";
import LogoFull from "@/public/rolecall-logo-full.png";
import { useSearchParams } from "next/navigation";

function InterviewErrorPage() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get('type') || 'not-found';

  const getErrorContent = () => {
    switch (errorType) {
      case 'expired':
        return {
          title: 'Interview Link Expired',
          description: 'This interview link has expired and is no longer valid. Please contact the recruiter for a new interview link.',
          reasons: [
            '• The interview was scheduled for a specific time period',
            '• The interview link has a built-in expiration date',
            '• The interview may have been rescheduled',
          ]
        };
      case 'completed':
        return {
          title: 'Interview Already Completed',
          description: 'This interview has already been completed. You can only take each interview once.',
          reasons: [
            '• You have already completed this interview',
            '• Someone else may have used this link',
            '• The interview results have been submitted',
          ]
        };
      case 'network':
        return {
          title: 'Connection Error',
          description: 'We\'re having trouble connecting to our servers. Please check your internet connection and try again.',
          reasons: [
            '• Check your internet connection',
            '• Try refreshing the page',
            '• Our servers may be temporarily unavailable',
          ]
        };
      default:
        return {
          title: 'Interview Not Found',
          description: 'We couldn\'t find the interview you\'re looking for. This could happen if the interview link has expired, been cancelled, or there was a typo in the URL.',
          reasons: [
            '• The interview link has expired',
            '• The interview has been cancelled',
            '• There was a typo in the interview URL',
            '• The interview has already been completed',
          ]
        };
    }
  };

  const errorContent = getErrorContent();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-secondary border border-border rounded-xl p-8 text-center space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src={LogoFull}
              alt="RoleCall Logo"
              className="w-40 h-auto"
            />
          </div>

          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">
              {errorContent.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {errorContent.description}
            </p>
          </div>

          {/* Possible Reasons */}
          <div className="bg-background border border-border rounded-lg p-4 text-left space-y-2">
            <h3 className="font-semibold text-foreground text-sm">What happened:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {errorContent.reasons.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {errorType === 'network' && (
              <Button 
                onClick={() => window.location.reload()} 
                className="w-full gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
            )}
            
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <Home className="w-4 h-4" />
                Go to Homepage
              </Button>
            </Link>
            
            <div className="text-sm mt-3 text-muted-foreground">
              Need help?
            </div>
            
            <Button 
              variant="outline" 
              className="w-full gap-2"
              onClick={() => {
                const subject = `Interview Link Issue - ${errorContent.title}`;
                const body = `I'm having trouble accessing my interview.\n\nError Type: ${errorType}\nIssue: ${errorContent.title}\n\nPlease help me resolve this issue.`;
                window.open(`mailto:lgomez00714@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
              }}
            >
              <Mail className="w-4 h-4" />
              Contact Support
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Need immediate assistance? Email us at{" "}
              <a 
                href="mailto:lgomez00714@gmail.com" 
                className="text-primary hover:underline"
              >
                lgomez00714@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewErrorPage;