import React, { useState } from 'react';
import { 
  Clock, 
  Tag, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  CheckCircle, 
  AlertTriangle,
  Hash
} from 'lucide-react';

function QuestionCard({ question }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get difficulty color styling
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-secondary text-muted-foreground border-border';
    }
  };

  // Get type color styling
  const getTypeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case 'technical':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'behavioral':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'experience':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'problem solving':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400';
      case 'leadership':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400';
      default:
        return 'bg-secondary text-muted-foreground';
    }
  };

  return (
    <div className="bg-background rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${getTypeStyle(question.type)}`}>
            {question.type}
          </span>
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyStyle(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground text-xs">
          <Clock className="h-3 w-3" />
          <span>{question.estimated_time_min}min</span>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-3">
        <p className="text-sm text-foreground font-medium leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Topic */}
      {question.topic && (
        <div className="mb-3 bg-gray">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span className="font-medium text-foreground">{question.topic}</span>
          </div>
        </div>
      )}

      {/* Skill Tags */}
      {question.skill_tags && question.skill_tags.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {question.skill_tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded-md text-xs"
              >
                <Tag className="h-2 w-2" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Section */}
      <div className="border-t border-border pt-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center cursor-pointer gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Show less details
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Show more details
            </>
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 space-y-3">
            {/* Follow-up Questions */}
            {question.follow_ups && question.follow_ups.length > 0 && (
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <MessageCircle className="h-3 w-3 text-blue-600" />
                  <span className="text-xs font-semibold text-foreground">Follow-up Questions</span>
                </div>
                <ul className="space-y-1">
                  {question.follow_ups.map((followUp, index) => (
                    <li key={index} className="text-xs text-muted-foreground pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                      {followUp}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Good Answers Include */}
            {question.what_good_answers_include && question.what_good_answers_include.length > 0 && (
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-semibold text-foreground">Good Answers Include</span>
                </div>
                <ul className="space-y-1">
                  {question.what_good_answers_include.map((item, index) => (
                    <li key={index} className="text-xs text-muted-foreground pl-4 border-l-2 border-green-200 dark:border-green-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Red Flags */}
            {question.red_flags && question.red_flags.length > 0 && (
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <AlertTriangle className="h-3 w-3 text-red-600" />
                  <span className="text-xs font-semibold text-foreground">Red Flags</span>
                </div>
                <ul className="space-y-1">
                  {question.red_flags.map((flag, index) => (
                    <li key={index} className="text-xs text-muted-foreground pl-4 border-l-2 border-red-200 dark:border-red-800">
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;