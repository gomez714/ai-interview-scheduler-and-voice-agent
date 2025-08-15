import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  CheckCircleIcon,
  Clock,
  CopyIcon,
  List,
  Mail,
  Slack,
  ArrowLeft,
  Plus,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";

function InterviewLink({ interviewId, formData, questions = [] }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/interview/${interviewId}`;

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <CheckCircleIcon className="text-green-500 w-20 h-20" />
      <h2 className="font-bold text-lg mt-4">Your AI Interview Is Ready!</h2>
      <p className="mt-3">
        Share the link below with you candidate to start the interview
      </p>

      <div className="w-full mt-6 p-7 rounded-lg bg-secondary">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold"> Interview Link</h2>
          <h2 className="p-1 px-2 text-primary bg-blue-50 rounded-xl">
            Valid for 30 days.
          </h2>
        </div>
        <div className="mt-3 flex gap-3">
          <Input defaultValue={url} disabled className="bg-white" />
          <Button onClick={handleCopyLink} className="cursor-pointer">
            <CopyIcon />
            Copy Link
          </Button>
        </div>
        <hr className="my-7 border-gray-500" />
        <div className="flex gap-5">
          <h2 className="text-sm text-gray-500 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {formData?.duration} Min
          </h2>
          <h2 className="text-sm text-gray-500 flex items-center gap-2">
            <List className="w-4 h-4" />
            {questions?.length} Questions
          </h2>
          {/* <h2 className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="w-4 h-4"/>
               30 {formData?.createdAt} Min
            </h2> */}
        </div>
      </div>

      <div className="mt-7 bg-secondary p-5 rounded-lg w-full">
        <h2 className="font-semibold">Share via</h2>
        <div className="mt-3 flex gap-3">
          <Button variant="outline">
            <Mail />
            Email
          </Button>
          <Button variant="outline">
            <Slack />
            Slack
          </Button>
          <Button variant="outline">
            <Mail />
            Email
          </Button>
        </div>
      </div>
      <div className="mt-7 flex w-full justify-between gap-5">
        <Link href="/dashboard">
          <Button
            className=" flex items-center gap-2 cursor-pointer"
            variant="outline"
          >
            <ArrowLeft />
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/create-interview">
          <Button className=" flex items-center gap-2 cursor-pointer">
            <Plus />
            Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
