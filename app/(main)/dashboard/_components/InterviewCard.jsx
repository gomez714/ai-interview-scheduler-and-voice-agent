import React from "react";
import { Copy, Send, Video } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendInterviewInvitation } from "@/utils/emailTemplates";

function InterviewCard({ interview }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/interview/${interview?.interview_id}`;

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
        <h2 className="mt-2">{interview?.duration} minutes</h2>
        <div className="flex gap-3 mt-5 w-full">
          <Button variant="outline" className="w-1/2" onClick={handleCopyLink}>
            <Copy />
            Copy Link
          </Button>
          <Button className="w-1/2" onClick={onSend}>
            <Send />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewCard;
