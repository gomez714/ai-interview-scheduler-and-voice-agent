"use client";

import React from "react";
import Image from "next/image";
import logoBlue from "@/public/rolecall-logo-blue.png";
import loginImage from "@/public/login.png";
import { Button } from "@/components/ui/button";
import supabase from "@/services/supabaseClient";

export default function Login() {

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
