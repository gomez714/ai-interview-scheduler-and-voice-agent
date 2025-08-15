import OpenAI from "openai";
import { QUESTION_PROMPT } from "@/constants/Prompts";
import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();

  const prompt = QUESTION_PROMPT.replace("{{jobPosition}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    console.log(completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate interview questions" },
      { status: 500 }
    );
  }
}
