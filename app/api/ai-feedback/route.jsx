import { FEEDBACK_PROMPT } from "@/constants/Prompts";
import { NextResponse } from "next/server";
import openai from "@/lib/openai";

export async function POST(req) {
  const { conversation } = await req.json();
  console.log("Conversation data received:", conversation ? conversation.length : "null/undefined");
  
  const prompt = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );

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

    console.log("API Response structure:", {
      hasChoices: !!completion.choices,
      choicesLength: completion.choices?.length,
      firstChoice: !!completion.choices?.[0]
    });

    console.log(completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      status: error.status,
      type: error.constructor.name
    });
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}
