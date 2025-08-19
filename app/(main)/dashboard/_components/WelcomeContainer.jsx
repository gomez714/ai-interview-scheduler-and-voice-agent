"use client";
import { useUser } from "../../AuthProvider";
import Image from "next/image";
import React, { useState } from "react";
import { Sparkles, Users, Clock } from "lucide-react";
import TutorialCard from "./TutorialCard";
import IndustryQuickStart from "./IndustryQuickStart";

function WelcomeContainer() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Check if user is still considered "new" (less than 4 days since signup)
  const isNewUser = () => {
    if (!user?.created_at) return true; // Show for users without timestamp
    
    const accountAge = Date.now() - new Date(user.created_at).getTime();
    const daysSinceSignup = accountAge / (1000 * 60 * 60 * 24);
    
    return daysSinceSignup < 4; // Hide after 4 days
  };

  const showNewUserComponents = isNewUser();

  return (
    <div className="space-y-6">
      {/* Tutorial Card for new users */}
      <TutorialCard />

      {/* Welcome Section */}
      <div className="bg-secondary border border-border rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Left Content */}
          <div className="flex items-center gap-4">
            {/* Welcome Icon */}
            <div className="p-3 bg-background border border-border rounded-lg">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            
            {/* Welcome Text */}
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-foreground">
                {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}!
              </h2>
              <p className="text-muted-foreground text-sm">
                {showNewUserComponents 
                  ? "Ready to streamline hiring process with AI interviews?"
                  : "Welcome back! Ready to create your next interview?"
                }
              </p>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex items-center gap-4">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4 mr-4">
              <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {user?.credits || 0} credits
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-foreground">Ready</span>
              </div>
            </div>
            
            {/* User Avatar */}
            {user?.image_url && (
              <div className="relative">
                <div className="p-1 bg-background border border-border rounded-full">
                  <Image
                    src={user.image_url}
                    alt={`${user.name}'s avatar`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Stats */}
        <div className="md:hidden mt-4 pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg flex-1">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {user?.credits || 0} credits available
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-foreground">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Quick Start for new users */}
      <IndustryQuickStart />
    </div>
  );
}

export default WelcomeContainer;
