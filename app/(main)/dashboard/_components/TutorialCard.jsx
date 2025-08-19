"use client";
import { BookOpen, PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "../../AuthProvider";

const TutorialCard = () => {
  const { user } = useUser();

  // Check if user is still considered "new" (less than 4 days since signup)
  const isNewUser = () => {
    if (!user?.created_at) return true; // Show for users without timestamp
    
    const accountAge = Date.now() - new Date(user.created_at).getTime();
    const daysSinceSignup = accountAge / (1000 * 60 * 60 * 24);
    
    return daysSinceSignup < 4; // Hide after 4 days
  };

  // Don't render if user is no longer new
  if (!isNewUser()) {
    return null;
  }
  return (
    <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg border border-primary/20 p-6 mb-6">
      <div className="flex items-start gap-4">
        <div className="bg-primary/20 p-3 rounded-full flex-shrink-0">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            New to RoleCall? Let's get you started! 🚀
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Take our 2-minute guided tour to learn how to create your first AI-powered mock interview 
            and receive detailed feedback to improve your interview skills.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/help"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <PlayCircle className="w-4 h-4" />
              Start Tutorial
            </Link>
            
            <Link 
              href="/help#quick-start"
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors border"
            >
              Quick Start Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialCard;