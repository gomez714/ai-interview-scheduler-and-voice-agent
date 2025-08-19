import {
  Calendar,
  Clock,
  Video,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import QuestionCard from "./QuestionCard";
function InterviewDetailsContainer({ interviewDetails }) {
  // Parse interview types from string to array
  const parseInterviewTypes = (typeString) => {
    if (!typeString) return [];

    try {
      // If it's already an array, return it
      if (Array.isArray(typeString)) return typeString;

      // If it's a string that looks like an array, parse it
      if (typeof typeString === "string" && typeString.startsWith("[")) {
        return JSON.parse(typeString);
      }

      // If it's a simple string, wrap it in an array
      return [typeString];
    } catch (error) {
      console.warn("Failed to parse interview types:", error);
      // Fallback: try to split by comma if JSON parsing fails
      return typeString
        .split(",")
        .map((type) => type.trim().replace(/["\[\]]/g, ""));
    }
  };

  const interviewTypes = parseInterviewTypes(interviewDetails?.interviewType);

  // State for job description expansion
  const [isJobDescriptionExpanded, setIsJobDescriptionExpanded] =
    useState(false);

  // Function to check if job description is long enough to need truncation
  const shouldTruncateDescription = (description) => {
    if (!description) return false;
    // Clean the description first, then check length
    const cleanedDescription = cleanDescription(description);
    // Check if description has more than approximately 6-8 lines
    // Assuming ~80 characters per line, 6-8 lines would be ~480-640 characters
    return cleanedDescription.length > 500;
  };

  // Function to clean up excessive whitespace in description
  const cleanDescription = (description) => {
    if (!description) return "";

    return (
      description
        // Replace multiple consecutive newlines with double newlines (paragraph breaks)
        .replace(/\n\s*\n\s*\n+/g, "\n\n")
        // Replace multiple spaces with single spaces
        .replace(/[ \t]+/g, " ")
        // Remove leading/trailing whitespace
        .trim()
    );
  };

  // Function to get truncated description
  const getTruncatedDescription = (description) => {
    if (!description) return "";

    // First clean the description
    const cleanedDescription = cleanDescription(description);

    if (!shouldTruncateDescription(cleanedDescription))
      return cleanedDescription;
    if (isJobDescriptionExpanded) return cleanedDescription;

    // Truncate to approximately 6 lines worth of text
    const truncated = cleanedDescription.substring(0, 500);
    // Try to cut at a word boundary
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    return lastSpaceIndex > 400
      ? truncated.substring(0, lastSpaceIndex) + "..."
      : truncated + "...";
  };

  return (
    <div className="p-4 sm:p-5 lg:p-6 bg-secondary rounded-lg border mt-5">
      <h2 className="text-xl sm:text-lg lg:text-xl font-bold text-foreground">{interviewDetails?.jobPosition}</h2>
      {/* Mobile-first responsive layout for interview metadata */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:pr-52">
        <div className="space-y-2">
          <h2 className="text-sm text-muted-foreground">Duration</h2>
          <div className="text-sm font-bold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{interviewDetails?.duration} minutes</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-sm text-muted-foreground">Created On</h2>
          <div className="text-sm font-bold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{moment(interviewDetails?.created_at).format("DD MMM YYYY")}</span>
          </div>
        </div>
        
        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
          <h2 className="text-sm text-muted-foreground">Types</h2>
          <div className="flex items-start gap-2">
            <Video className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-1 min-w-0">
              {interviewTypes.length > 0 ? (
                interviewTypes.map((type, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium border border-primary/20 whitespace-nowrap"
                  >
                    {type}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground text-sm">No types specified</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <h2 className="text-base sm:text-lg font-bold text-foreground mb-3">Job Description</h2>
        <div className="relative">
          <p className="text-sm sm:text-base text-foreground leading-relaxed whitespace-pre-wrap">
            {getTruncatedDescription(interviewDetails?.jobDescription)}
          </p>

          {shouldTruncateDescription(interviewDetails?.jobDescription) && (
            <button
              onClick={() =>
                setIsJobDescriptionExpanded(!isJobDescriptionExpanded)
              }
              className="mt-3 inline-flex items-center cursor-pointer gap-1 text-sm sm:text-base text-primary hover:text-primary/80 font-medium transition-colors py-2 px-1 touch-manipulation"
            >
              {isJobDescriptionExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show full job description
                </>
              )}
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 md:mt-10">
        <h2 className="text-base sm:text-lg font-bold text-foreground mb-4">Questions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {interviewDetails?.questionList.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailsContainer;
