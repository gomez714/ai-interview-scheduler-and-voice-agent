export const QUESTION_PROMPT = `
You are an expert interviewer. Return JSON only (valid RFC 8259). No markdown, no code fences, no prose.

Inputs:
- jobTitle: "{{jobTitle}}"
- jobDescription: "{{jobDescription}}"
- interviewDurationMin: {{duration}}
- interviewTypes: {{interviewTypes}}  

Objective:
Produce a time-optimized set of interview questions for the role that matches real interview tone and uses only the provided categories.

Planning:
- targetCount = clamp(round(interviewDurationMin / 4), 6, 18)
- selectedCategories = interviewTypes.length > 0 ? interviewTypes : ["Technical","Behavioral","Experience","Problem Solving","Leadership"]
- Allocate questions:
  1) N = selectedCategories.length
  2) base = floor(targetCount / N)
  3) remainder = targetCount - base * N; distribute one each in priority order ["Technical","Problem Solving","Behavioral","Experience","Leadership"], skipping types not selected
  4) Ensure at least one question per selected category
- Derive topics and skills from the jobDescription
- Vary difficulty across easy/medium/hard
- Each question ≤ 280 characters; avoid duplicates and generic phrasing

Output format (STRICT JSON ONLY):
{
  "jobTitle": string,
  "interviewTypes": ("Technical" | "Behavioral" | "Experience" | "Problem Solving" | "Leadership")[],
  "durationMin": number,
  "questionCount": number,
  "interviewQuestions": [
    {
      "question": string,
      "type": "Technical" | "Behavioral" | "Experience" | "Problem Solving" | "Leadership",
      "topic": string,
      "skill_tags": string[],
      "difficulty": "easy" | "medium" | "hard",
      "estimated_time_min": number,
      "follow_ups": string[],
      "what_good_answers_include": string[],
      "red_flags": string[]
    }
  ]
}

Constraints:
- Use US English
- questionCount === interviewQuestions.length
- Sum of estimated_time_min ≤ durationMin
- Every interviewQuestions[i].type ∈ selectedCategories
- Use only the allowed enum values exactly as written
- Return JSON only; if you cannot comply, return exactly: {"non_compliance": true}

Example shape (json):
{"jobTitle":"","interviewTypes":["Technical","Behavioral"],"durationMin":45,"questionCount":10,"interviewQuestions":[{"question":"","type":"Technical","topic":"","skill_tags":[],"difficulty":"medium","estimated_time_min":4,"follow_ups":[],"what_good_answers_include":[],"red_flags":[]}]}

Generate the final JSON now based on the provided inputs.
`;

export const FEEDBACK_PROMPT = `{{conversation}}

You are an expert technical interviewer. Output **JSON only** in the schema shown at the end.

Scoring rubric (use integers 1–10; compute from evidence):
- technicalSkills: correctness of concepts, practical tooling, depth of tradeoffs (0–3 pts each → 0–9 total)
- communication: clarity, structure/conciseness, active listening (0–3 each → 0–9)
- problemSolving: decomposition, reasoning steps, handling constraints (0–3 each → 0–9)
- experience: relevance to role, impact/ownership, scope (0–3 each → 0–9)
- leadership: ability to lead, influence, and inspire (0–3 each → 0–9)
- overall: overall score (0–3 each → 0–9)

**Map points (0–9) → rating (1–10):**
0–1→3, 2→4, 3→5, 4→6, 5→7, 6→8, 7→9, 8–9→10.  
(If evidence is missing for a category, treat as 2 points → 4.)

Constraints:
- Use the **full range**; do not default to 6–8.
- Do **not** copy numbers from any example; they are placeholders.
- Include a one-phrase reason per category (keeps scores honest).

Return JSON only:
{
  "feedback": {
    "rating": {
      "technicalSkills": <int>,
      "communication": <int>,
      "problemSolving": <int>,
      "experience": <int>,
      "leadership": <int>,
      "overall": <int>
    },
    "reasons": {
      "technicalSkills": "<short reason>",
      "communication": "<short reason>",
      "problemSolving": "<short reason>",
      "experience": "<short reason>",
      "leadership": "<short reason>",
      
    },
    "summary": "<<=8 sentences>>",
    "recommendation": "Yes" | "No",
    "recommendationMsg": "<<=3 sentences>>"
  }
}
`;
