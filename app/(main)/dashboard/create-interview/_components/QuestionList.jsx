"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import QuestionListContainer from "./QuestionListContainer";
import supabase from "@/services/supabaseClient";
import { useUser } from "../../../AuthProvider";
import { v4 as uuidv4 } from "uuid";

function QuestionList({ formData, onCreateInterviewLink }) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);
  
  
  // Add refs to track if API call has been made
  const hasGeneratedRef = useRef(false);
  const lastFormDataRef = useRef(null);

  // Robustly parse the model output (handles raw JSON or ```json fenced blocks)
  function parsePlanFromContent(content) {
    try {
      const fenced =
        content.match(/```json\s*([\s\S]*?)\s*```/i) ||
        content.match(/```\s*([\s\S]*?)\s*```/);
      const body = fenced ? fenced[1] : content;

      const start = body.indexOf("{");
      const end = body.lastIndexOf("}");
      if (start === -1 || end === -1 || end <= start)
        throw new Error("No JSON object found");

      const obj = JSON.parse(body.slice(start, end + 1));
      return obj;
    } catch (e) {
      console.error("Parse error:", e);
      return null;
    }
  }

  const generateQuestionList = async () => {
    // Prevent duplicate calls
    if (hasGeneratedRef.current) {
      return;
    }
    
    setLoading(true);
    hasGeneratedRef.current = true;
    
    try {
      const response = await axios.post("/api/ai-model", formData);
      const plan = parsePlanFromContent(response.data.content);
      if (!plan || !Array.isArray(plan.interviewQuestions)) {
        throw new Error("Malformed AI response");
      }
      setQuestions(plan.interviewQuestions);
    } catch (error) {
      console.error(error);
      toast.error("Server Error, Try again later");
      setQuestions([]);
      hasGeneratedRef.current = false; // Reset on error to allow retry
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    setSaveLoading(true);
    const interview_id = uuidv4();
    try {
      const { data, error } = await supabase
        .from("interviews")
      .insert([
        {
          ...formData,
          questionList: questions,
          userEmail: user?.email,
          interview_id,
        },
      ])
      .select();

      const userUpdate = await supabase
      .from("users")
      .update({credits:  Number(user?.credits) - 1})
      .eq("email", user?.email)
      .select();

      onCreateInterviewLink(interview_id, questions)
    } catch (error) {
      console.error(error);
      toast.error("Error creating interview");
    } finally {
      setSaveLoading(false);
    }

  };

  useEffect(() => {
    if (formData && !hasGeneratedRef.current) {
      // Store current formData for comparison
      lastFormDataRef.current = formData;
      generateQuestionList();
    }
  }, []); // Empty dependency array - only run once

  // Separate effect to handle formData changes (if needed)
  useEffect(() => {
    if (formData && hasGeneratedRef.current) {
      // Check if formData actually changed significantly
      const currentFormDataString = JSON.stringify(formData);
      const lastFormDataString = JSON.stringify(lastFormDataRef.current);
      
      if (currentFormDataString !== lastFormDataString) {
        hasGeneratedRef.current = false;
        lastFormDataRef.current = formData;
        generateQuestionList();
      }
    }
  }, [formData?.jobPosition, formData?.jobDescription, formData?.duration, formData?.type]); // Specific fields

  return (
    <div>
      {loading && (
        <div className="p-5 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-2">
          <Loader2Icon className="animate-spin text-primary" />
          <div>
            <h2 className="font-medium text-foreground">Generating Interview Questions</h2>
            <p className="text-sm text-muted-foreground">
              Our AI is crafting personalized questions based on your job
              position and description
            </p>
          </div>
        </div>
      )}

      {!loading && questions.length > 0 && (
        <QuestionListContainer questions={questions} onFinish={onFinish} saveLoading={saveLoading} />
      )}
    </div>
  );
}

export default QuestionList;
