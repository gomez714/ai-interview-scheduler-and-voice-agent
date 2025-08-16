import React from "react";
import { ArrowRight, Copy, Send, Video } from "lucide-react";
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

  return (
    <div>
      <div className="p-5 bg-secondary rounded-lg border">
        <div className="flex items-center justify-between">
          <div className="h-12 w-12 p-2 text-primary bg-blue-100 rounded-full"></div>
          <h2 className="text-sm text-gray-700">
            {moment(interview?.created_at).format("ddd, DD MMM YYYY h:mm A")}
          </h2>
        </div>
        <h2 className="text-lg font-bold mt-3">{interview?.jobPosition}</h2>
        <h2 className="mt-2 flex justify-between text-gray-700">
          {interview?.duration} minutes
          <span className="text-sm text-green-700">
            {interview["interview_feedback"]?.length} Candidates
          </span>
        </h2>
        {!viewDetails && (
          <div className="flex gap-3 mt-5 w-full">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={handleCopyLink}
            >
              <Copy />
              Copy Link
            </Button>
            <Button className="w-1/2" onClick={onSend}>
              <Send />
              Send
            </Button>
          </div>
        )}
        {viewDetails && (
          <Button
            variant="outline"
            className="w-full mt-5 flexitems-center"
            onClick={() => router.push(`/scheduled-interviews/${interview?.interview_id}/details`)}
          >
            View Details
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}

export default InterviewCard;
