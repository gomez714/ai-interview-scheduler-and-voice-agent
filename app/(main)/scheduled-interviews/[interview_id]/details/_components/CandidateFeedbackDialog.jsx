import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User, Star, ThumbsUp, ThumbsDown, Award, TrendingUp } from "lucide-react";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback.feedback;
  const rating = feedback?.rating;

  const getOverallRating = () => {
    let total = 0;
    Object.values(rating).forEach(value => {
      total += value;
    })
    return total / Object.values(rating).length;
  }
  console.log(feedback);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200">
          <Award className="w-4 h-4 mr-2" />
          View Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <User className="w-6 h-6" />
            Candidate Feedback Report
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl border border-blue-100 mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 sm:p-4 rounded-full font-bold text-white text-lg sm:text-xl shadow-lg flex-shrink-0">
                      {candidate.username[0].toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{candidate.username}</h2>
                      <h2 className="text-xs sm:text-sm text-gray-600 flex items-center justify-center gap-1 truncate">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{candidate.user_email}</span>
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-white p-3 sm:p-4 rounded-lg shadow-sm border flex-shrink-0">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 fill-current" />
                    <div className="text-center">
                      <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
                        {rating?.overall ? rating?.overall : getOverallRating().toFixed(1)}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500">out of 10</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Skills Assessment
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Technical Skills</h3>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {rating?.technicalSkills}/10
                      </span>
                    </div>
                    <Progress value={rating?.technicalSkills * 10} className="mb-3" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feedback?.reasons?.technicalSkills}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Communication</h3>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {rating?.communication}/10
                      </span>
                    </div>
                    <Progress value={rating?.communication * 10} className="mb-3" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feedback?.reasons?.communication}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Problem Solving</h3>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        {rating?.problemSolving}/10
                      </span>
                    </div>
                    <Progress value={rating?.problemSolving * 10} className="mb-3" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feedback?.reasons?.problemSolving}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Experience</h3>
                      <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                        {rating?.experience}/10
                      </span>
                    </div>
                    <Progress value={rating?.experience * 10} className="mb-3" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feedback?.reasons?.experience}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 md:col-span-2">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-700">Leadership</h3>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
                        {rating?.leadership}/10
                      </span>
                    </div>
                    <Progress value={rating?.leadership * 10} className="mb-3" />
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feedback?.reasons?.leadership}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Overall Feedback
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    {feedback?.summary}
                  </p>
                </div>
              </div>
              <div className={`p-6 rounded-xl border shadow-sm mt-6 ${
                feedback?.recommendation === "Yes" 
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" 
                  : "bg-gradient-to-r from-red-50 to-rose-50 border-red-200"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className={`font-bold text-xl mb-3 flex items-center gap-2 ${
                      feedback?.recommendation === "Yes" ? "text-green-700" : "text-red-700"
                    }`}>
                      {feedback?.recommendation === "Yes" ? (
                        <ThumbsUp className="w-6 h-6" />
                      ) : (
                        <ThumbsDown className="w-6 h-6" />
                      )}
                      Final Recommendation
                    </h2>
                    <p className={`text-md leading-relaxed ${
                      feedback?.recommendation === "Yes" ? "text-green-600" : "text-red-600"
                    }`}>
                      {feedback?.recommendationMsg}
                    </p>
                  </div>
                  <Button 
                    className={`ml-6 shadow-lg font-semibold px-6 py-3 ${
                      feedback?.recommendation === "Yes" 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-red-600 hover:bg-red-700"
                    }`}
                  >
                    {feedback?.recommendation === "Yes" ? (
                      <>
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Hire Candidate
                      </>
                    ) : (
                      <>
                        <ThumbsDown className="w-4 h-4 mr-2" />
                        Reject
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
