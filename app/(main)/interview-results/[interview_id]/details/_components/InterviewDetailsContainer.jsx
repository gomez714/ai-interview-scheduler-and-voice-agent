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
    <div className="p-5 bg-secondary rounded-lg border mt-5">
      <h2 className="text-lg font-bold">{interviewDetails?.jobPosition}</h2>
      <div className="mt-4 flex items-center justify-between lg:pr-52">
        <div className="">
          <h2 className="text-sm text-gray-700">Duration</h2>
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2 ">
            <Clock className="h-4 w-4" />
            {interviewDetails?.duration} minutes
          </h2>
        </div>
        <div className="">
          <h2 className="text-sm text-gray-700">Created On</h2>
          <h2 className="text-sm font-bold text-gray-700 flex items-center gap-2 ">
            <Calendar className="h-4 w-4" />
            {moment(interviewDetails?.created_at).format("DD MMM YYYY")}
          </h2>
        </div>
        <div className="">
          <h2 className="text-sm text-gray-700">Types</h2>
          <div className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Video className="h-4 w-4" />
            <div className="flex flex-wrap gap-1">
              {interviewTypes.length > 0 ? (
                interviewTypes.map((type, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium"
                  >
                    {type}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No types specified</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-gray-700">Job Description</h2>
        <div className="relative">
          <p className="text-sm text-gray-700 leading-6 whitespace-pre-wrap">
            {getTruncatedDescription(interviewDetails?.jobDescription)}
          </p>

          {shouldTruncateDescription(interviewDetails?.jobDescription) && (
            <button
              onClick={() =>
                setIsJobDescriptionExpanded(!isJobDescriptionExpanded)
              }
              className="mt-2 inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
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
      <div>
        <h2 className="font-bold text-gray-700">Questions</h2>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviewDetails?.questionList.map((question, index) => (
            <QuestionCard key={index} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailsContainer;
