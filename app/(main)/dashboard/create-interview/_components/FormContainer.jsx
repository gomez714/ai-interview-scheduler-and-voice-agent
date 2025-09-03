import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { InterviewTypes } from "@/constants/InterviewTypes";
import { Button } from "@/components/ui/button";
import { ArrowRight, Link, Loader2 } from "lucide-react";
import { useJobExtraction } from "@/hooks/useJobExtraction";

function FormContainer({ onHandleInputChange, goToNextStep }) {
  const [interviewType, setInterviewType] = useState([]);
  const [jobUrl, setJobUrl] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  
  // Use the custom hook
  const { extractJobDescription, isExtracting } = useJobExtraction();

  useEffect(() => {
    onHandleInputChange("interviewType", interviewType);
  }, [interviewType]);

  useEffect(() => {
    onHandleInputChange("jobPosition", jobPosition);
  }, [jobPosition]);

  useEffect(() => {
    onHandleInputChange("jobDescription", jobDescription);
  }, [jobDescription]);

  const AddInterviewType = (type) => {
    if (interviewType.includes(type)) {
      setInterviewType((prev) => prev.filter((t) => t !== type));
    } else {
      setInterviewType((prev) => [...prev, type]);
    }
  };

  const handleExtractJobDescription = async () => {
    const data = await extractJobDescription(jobUrl);
    
    if (data) {
      // Auto-fill the form fields
      if (data.jobTitle && !jobPosition) {
        setJobPosition(data.jobTitle);
      }
      
      if (data.jobDescription) {
        setJobDescription(data.jobDescription);
      }
    }
  };

  return (
    <div className="p-5 bg-secondary rounded-2xl">
      {/* URL Extraction Section */}
      <div className="mb-6 p-4 bg-background/50 rounded-lg border border-border">
        <h2 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Link className="w-4 h-4" />
          Extract from Job Posting URL (Optional)
        </h2>
        <p className="text-xs text-muted-foreground mb-3">
          Paste a LinkedIn job posting or other job board URL to automatically extract the job details
        </p>
        <div className="flex gap-2">
          <Input
            placeholder="https://www.linkedin.com/jobs/view/..."
            className="bg-white"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            disabled={isExtracting}
          />
          <Button 
            onClick={handleExtractJobDescription}
            disabled={isExtracting || !jobUrl.trim()}
            variant="outline"
            className="shrink-0"
          >
            {isExtracting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Extract"
            )}
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="e.g. Software Engineer"
          className="mt-2 bg-white"
          value={jobPosition}
          onChange={(e) => setJobPosition(e.target.value)}
        />
      </div>
      
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter or Paste details from Job description"
          className="h-[200px] bg-white mt-2"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full bg-white mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">60 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="mt-5">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex gap-3 mt-2 flex-wrap">
          {InterviewTypes.map((type, index) => (
            <div
              key={index}
              className={`flex gap-2 p-1 px-2 bg-background border items-center cursor-pointer border-border rounded-2xl hover:bg-secondary transition-colors ${
                interviewType.includes(type.title) 
                  ? "text-primary border-primary/50 bg-primary/10" 
                  : "text-foreground"
              }`}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="w-4 h-4" />
              <p>{type.title}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-7 flex justify-end" onClick={() => goToNextStep()}>
        <Button>
          Generate Questions <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
