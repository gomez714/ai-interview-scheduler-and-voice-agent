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
import { ArrowRight } from "lucide-react";

function FormContainer({ onHandleInputChange }) {
  const [interviewType, setInterviewType] = useState([]);

  useEffect(() => {
    onHandleInputChange("interviewType", interviewType);
  }, [interviewType]);

  const AddInterviewType = (type) => {
    if (interviewType.includes(type)) {
      setInterviewType((prev) => prev.filter((t) => t !== type));
    } else {
      setInterviewType((prev) => [...prev, type]);
    }
  };
  return (
    <div className="p-5 bg-secondary rounded-2xl">
      <div>
        <h2 className="text-sm font-medium">Job Postion</h2>
        <Input
          placeholder="e.g. Software Engineer"
          className="mt-2 bg-white"
          onChange={(e) => onHandleInputChange("jobPosition", e.target.value)}
        />
      </div>
      <div className="mt-5">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          placeholder="Enter details from Job description"
          className="h-[200px] bg-white mt-2"
          onChange={(e) =>
            onHandleInputChange("jobDescription", e.target.value)
          }
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
              className={`flex gap-2 p-1 px-2 bg-white border items-center cursor-pointer border-gray-200 rounded-2xl hover:bg-blue-200 ${
                interviewType.includes(type.title) && "text-primary"
              }`}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="w-4 h-4" />
              <p>{type.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 flex justify-end">
        <Button>
          Generate Questions <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
