import { Phone, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

function CreateOptions() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <Link
        href="/dashboard/create-interview"
        className="bg-secondary border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer"
      >
        <Video className="h-12 w-12 p-2 text-primary bg-blue-100 rounded-lg" />
        <h2 className="font-bold">Create New Interview</h2>
        <p className="text-gray-500">
          Create AI interviews and schedule candidates
        </p>
      </Link>
      <div className="bg-secondary border border-gray-200 rounded-lg p-5 flex flex-col gap-2 cursor-pointer">
        <Phone className="h-12 w-12 p-2 text-primary bg-blue-100 rounded-lg" />
        <h2 className="font-bold">Create New Phone Screening</h2>
        <p className="text-gray-500">
          Schedule screening calls with candidates
        </p>
      </div>
    </div>
  );
}

export default CreateOptions;
