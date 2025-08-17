import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function InterviewCardSkeleton({ showViewDetails = false }) {
  return (
    <div className="group">
      <div className="bg-secondary border border-border rounded-xl p-6 shadow-sm">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-background border border-border rounded-lg">
              <Skeleton className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Interview Details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
          <Skeleton className="h-3 w-28" />
        </div>

        {/* Interview Types */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-6 w-20 rounded" />
            <Skeleton className="h-6 w-14 rounded" />
          </div>
        </div>

        {/* Action Buttons */}
        {!showViewDetails && (
          <div className="flex gap-2">
            <Skeleton className="h-9 flex-1 rounded-md" />
            <Skeleton className="h-9 flex-1 rounded-md" />
          </div>
        )}
        
        {showViewDetails && (
          <Skeleton className="h-9 w-full rounded-md" />
        )}
      </div>
    </div>
  );
}

export default InterviewCardSkeleton;