import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Star, User } from "lucide-react";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";
function CandidatesList({ candidateList }) {
  const getOverallRating = (candidate) => {
    const feedback = candidate?.feedback.feedback;
    const rating = feedback?.rating;
    let total = 0;
    Object.values(rating).forEach((value) => {
      total += value || 0;
    });
    return total / Object.values(rating).length;
  };
  return (
    <div className="mt-8">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-600" />
          Interview Candidates
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium ml-2">
            {candidateList?.length}
          </span>
        </h2>
      </div>
      
      {candidateList?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 text-lg">No candidates have completed this interview yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {candidateList?.map((candidate, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-blue-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-full font-bold text-white text-lg shadow-lg flex-shrink-0">
                    {candidate.username[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-500" />
                      {candidate.username}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      Completed on {moment(candidate.created_at).format("DD MMM YYYY")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-lg border border-yellow-200">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <div className="text-center">
                      <span className="text-xl font-bold text-blue-600">
                        {candidate?.feedback?.feedback?.rating?.overall
                          ? candidate?.feedback?.feedback?.rating?.overall
                          : getOverallRating(candidate).toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">/ 10</span>
                    </div>
                  </div>
                  <CandidateFeedbackDialog candidate={candidate} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidatesList;
