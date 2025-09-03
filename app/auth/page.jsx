"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoBlue from "@/public/rolecall-logo-blue.png";
import loginImage from "@/public/login.png";
import { Button } from "@/components/ui/button";
import supabase from "@/services/supabaseClient";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EmailAuthForm from "./_components/EmailAuthForm";
import AuthDivider from "./_components/AuthDivider";

export default function Login() {
  const { user, loading } = useSimpleAuth();
  const router = useRouter();
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redirect authenticated users to dashboard immediately
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6">
          {/* Logo Loading */}
          <div className="flex justify-center">
            <div className="p-4 bg-secondary border border-border rounded-xl">
              <Image
                src={logoBlue}
                alt="RoleCall Logo"
                width={120}
                height={60}
                className="w-[120px] h-[60px] object-contain"
              />
            </div>
          </div>
          
          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Loading RoleCall</h2>
            <p className="text-muted-foreground">Checking your authentication...</p>
          </div>
          
          {/* Loading Spinner */}
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  // If user exists, show redirecting state instead of login form
  if (user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-secondary border border-border rounded-xl">
              <Image
                src={logoBlue}
                alt="RoleCall Logo"
                width={120}
                height={60}
                className="w-[120px] h-[60px] object-contain"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Redirecting to Dashboard</h2>
            <p className="text-muted-foreground">Taking you to your dashboard...</p>
          </div>
          <div className="flex justify-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  const signInWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Google auth error:", error);
        toast.error("Failed to sign in with Google");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setGoogleLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-secondary border border-border rounded-xl">
              <Image
                src={logoBlue}
                alt="RoleCall Logo"
                width={120}
                height={60}
                className="w-[120px] h-[60px] object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome to RoleCall</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your account to continue
          </p>
        </div>

        {/* Authentication Card */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="space-y-6">
            {/* Email Authentication Form */}
            <EmailAuthForm />
            
            {/* Divider */}
            <AuthDivider />
            
            {/* Google Authentication */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                variant="outline"
                onClick={signInWithGoogle}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in with Google...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            By signing in, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}
