"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import logoBlue from "@/public/rolecall-logo-blue.png";
import loginImage from "@/public/login.png";
import { Button } from "@/components/ui/button";
import supabase from "@/services/supabaseClient";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user, loading } = useSimpleAuth();
  const router = useRouter();

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
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    })

    if (error) {
      console.error("error", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="border rounded-2xl p-8 flex flex-col items-center">
        <Image
          src={logoBlue}
          alt="logo"
          width={200}
          height={100}
          className=" w-[200px] rounded-2xl mb-5"
        />
        <div className="flex items-center flex-col ">
          <Image
            src={loginImage}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[350px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to RoleCall
          </h2>
          <p className="text-center text-gray-500">
            Sign In With Google Authentication
          </p>
          <Button className='mt-7 w-full' onClick={signInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
