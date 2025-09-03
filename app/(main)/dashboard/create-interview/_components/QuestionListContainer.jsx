import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

function QuestionListContainer({ questions, onFinish, saveLoading }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-5 text-foreground">Generated questions</h2>
      <div className="space-y-3 p-5 border border-border bg-secondary rounded-xl">
        {questions.map((q, idx) => (
          <div
            key={`${q.type}-${idx}`}
            className="p-3 border border-border rounded-xl mb-3 bg-background hover:bg-background/80 transition-colors"
          >
            <h2 className="font-bold text-foreground">{q.question}</h2>
            <div className="text-xs text-primary mt-2">
              {q.type}
              {q.topic ? ` • ${q.topic}` : ""}
              {q.difficulty ? ` • ${q.difficulty}` : ""}
              {q.estimated_time_min ? ` • ${q.estimated_time_min} min` : ""}
            </div>

            {/* Optional: show follow-ups */}
            {Array.isArray(q.follow_ups) && q.follow_ups.length > 0 && (
              <ul className="list-disc pl-5 mt-2 text-sm text-muted-foreground">
                {q.follow_ups.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
            {saveLoading ? <Loader2Icon className="animate-spin" /> : "Create Interview Link"}
        </Button>
      </div>
    </div>
  );
}

export default QuestionListContainer;
