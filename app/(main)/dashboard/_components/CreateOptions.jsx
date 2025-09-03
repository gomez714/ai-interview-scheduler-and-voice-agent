import { Phone, Video, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

function CreateOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Create Interview Card */}
      <Link
        href="/dashboard/create-interview"
        className="group bg-secondary border border-border rounded-xl p-6 flex flex-col gap-4 cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div className="p-3 bg-background border border-border rounded-lg group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
            <Video className="h-6 w-6 text-primary" />
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            Create New Interview
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Create AI-powered interviews with custom questions and create a mock interview link you or a friend can use to practice.
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="inline-flex items-center gap-2 text-xs text-primary font-medium">
            <span>Start Creating</span>
            <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </Link>

      {/* Phone Screening Card (Coming Soon) */}
      <div className="relative group bg-secondary border border-border rounded-xl p-6 flex flex-col gap-4 cursor-not-allowed opacity-75">
        {/* Coming Soon Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-50 border border-orange-200 text-orange-700 rounded-full text-xs font-medium">
            <Clock className="h-3 w-3" />
            <span>Coming Soon</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="p-3 bg-background border border-border rounded-lg">
            <Phone className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-muted-foreground">
            Create New Phone Screening
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Schedule live phone screening calls with AI to practice your interview skills.
          </p>
        </div>
        
        <div className="mt-auto">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span>Feature in Development</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOptions;
