import React from "react";
import { ArrowRight, Copy, Send, Video, Clock, Users, Calendar } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendInterviewInvitation } from "@/utils/emailTemplates";
import { useRouter } from "next/navigation";

function InterviewCard({ interview, viewDetails = false }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/interview/${interview?.interview_id}`;
  const router = useRouter();
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  const onSend = () => {
    sendInterviewInvitation(interview, url);
  };

  const candidateCount = interview["interview_feedback"]?.length || 0;

  return (
    <div className="group">
      <div className="bg-secondary border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-primary/20">
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-background rounded-lg border border-border group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {interview?.jobPosition}
              </h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>{moment(interview?.created_at).format("MMM DD, YYYY")}</span>
              </div>
            </div>
          </div>
          
          {candidateCount > 0 && (
            <div className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 rounded-full text-xs font-medium">
              {candidateCount} Complete{candidateCount !== 1 ? 'd' : ''}
            </div>
          )}
        </div>

        {/* Interview Details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{interview?.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{candidateCount} candidate{candidateCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Created {moment(interview?.created_at).format("ddd, h:mm A")}
          </div>
        </div>

        {/* Interview Types Display */}
        {interview?.interviewType && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {(() => {
                // Handle different data formats - could be array or string
                let types = [];
                if (Array.isArray(interview.interviewType)) {
                  types = interview.interviewType;
                } else if (typeof interview.interviewType === 'string') {
                  // If it's a string, try to parse it or split it
                  try {
                    types = JSON.parse(interview.interviewType);
                  } catch {
                    types = interview.interviewType.split(',').map(type => type.trim());
                  }
                }
                
                if (types.length === 0) return null;
                
                return (
                  <>
                    {types.slice(0, 3).map((type, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-background border border-border text-foreground rounded text-xs font-medium"
                      >
                        {type}
                      </span>
                    ))}
                    {types.length > 3 && (
                      <span className="px-2 py-1 bg-background border border-border text-muted-foreground rounded text-xs">
                        +{types.length - 3} more
                      </span>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!viewDetails && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              onClick={handleCopyLink}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
            <Button 
              size="sm"
              className="flex-1 h-9" 
              onClick={onSend}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </div>
        )}
        
        {viewDetails && (
          <Button
            variant="outline"
            size="sm"
            className="w-full h-9 flex items-center justify-center gap-2"
            onClick={() => router.push(`/scheduled-interviews/${interview?.interview_id}/details`)}
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

export default InterviewCard;
