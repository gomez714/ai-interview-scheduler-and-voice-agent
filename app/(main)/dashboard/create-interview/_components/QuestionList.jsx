"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import QuestionListContainer from "./QuestionListContainer";
import  supabase  from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
function QuestionList({ formData, onCreateInterviewLink }) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

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
    setLoading(true);
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
      onCreateInterviewLink(interview_id, questions)
    console.log(data, error);
    } catch (error) {
      console.error(error);
      toast.error("Error creating interview");
    } finally {
      setSaveLoading(false);
    }

  };

  useEffect(() => {
    if (formData) generateQuestionList();
  }, [JSON.stringify(formData)]); // re-run when formData meaningfully changes

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex items-center gap-2">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-sm text-primary">
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
