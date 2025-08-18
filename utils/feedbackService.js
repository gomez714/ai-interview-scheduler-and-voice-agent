import axios from "axios";
import supabase from "@/services/supabaseClient";

class FeedbackService {
  static async generateAndSaveFeedback(conversationData, interviewInfo, router) {
    // Validate conversation data before sending
    if (!conversationData || conversationData.length === 0) {
      console.warn("No conversation data available for feedback generation");
      throw new Error("No conversation data available for feedback");
    }
    
    try {
      // Generate AI feedback
      const feedback = await this.generateFeedback(conversationData);
      
      // Save feedback to database
      await this.saveFeedbackToDatabase(feedback, interviewInfo);
      
      // Navigate to completed page
      const interviewId = interviewInfo?.interviewDetails?.interview_id;
      
      if (router && interviewId) {
        router.replace(`/interview/${interviewId}/completed`);
      } else {
        console.error("Cannot redirect - missing router or interviewId", {
          hasRouter: !!router,
          interviewId: interviewId
        });
      }
      
      return { success: true, feedback };
      
    } catch (error) {
      console.error("Failed to generate and save feedback:", error);
      throw error;
    }
  }

  static async generateFeedback(conversationData) {
    try {
      // Generate AI feedback
      const response = await axios.post("/api/ai-feedback", {
        conversation: conversationData,
      });
      
      const feedbackContent = response?.data?.content;
      
      if (!feedbackContent) {
        throw new Error("Feedback generated but content is empty");
      }

      // Parse the feedback JSON
      let parsedFeedback;
      try {
        parsedFeedback = JSON.parse(feedbackContent);
      } catch (parseError) {
        console.error("Failed to parse feedback JSON:", parseError);
        throw new Error("Failed to process feedback data");
      }

      return parsedFeedback;
      
    } catch (error) {
      console.error("Failed to generate feedback:", error);
      
      // Provide specific error handling
      if (error.response?.status === 400) {
        throw new Error("Invalid conversation data for feedback");
      } else if (error.response?.status === 500) {
        throw new Error("AI service temporarily unavailable");
      } else if (error.message) {
        throw error; // Re-throw custom errors
      } else {
        throw new Error("Failed to generate feedback - please try again later");
      }
    }
  }

  static async saveFeedbackToDatabase(feedback, interviewInfo) {
    try {
      
      // Get the interview ID from context (more reliable than URL parsing)
      const interviewId = interviewInfo?.interviewDetails?.interview_id;
      
      if (!interviewId) {
        throw new Error("Interview ID not found in interview context");
      }

      // Extract recommendation from feedback
      const feedbackObj = feedback.feedback || feedback;
      const recommendation = feedbackObj.Recommendation === "Yes";

      // Get user info from context
      const username = interviewInfo?.username || "Anonymous";
      const userEmail = interviewInfo?.email || "";

      // Prepare data for insertion
      const feedbackRecord = {
        feedback: feedback, // Store the complete feedback JSON
        username: username,
        user_email: userEmail,
        interview_id: interviewId,
        recommended: recommendation // Note: keeping your table's spelling
      };


      // Insert into interview_feedback table
      const { data, error } = await supabase
        .from('interview_feedback')
        .insert([feedbackRecord])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(`Database error: ${error.message}`);
      }

      
      return data;
      
    } catch (error) {
      console.error("Failed to save feedback to database:", error);
      throw new Error(`Failed to save feedback to database: ${error.message}`);
    }
  }

  static async updateInterviewStatus(interviewId) {
    try {
      const { error } = await supabase
        .from('interviews')
        .update({ 
          completed_at: new Date().toISOString(),
          has_feedback: true 
        })
        .eq('interview_id', interviewId);

      if (error) {
        console.warn("Failed to update interview status:", error);
        // Don't throw here as feedback is already saved
      }
      
      return { success: !error };
      
    } catch (error) {
      console.warn("Failed to update interview status:", error);
      return { success: false, error };
    }
  }

  static getErrorMessage(error) {
    if (error.message) {
      return error.message;
    }
    
    // Fallback error messages based on common scenarios
    if (error.response?.status === 400) {
      return "Invalid conversation data for feedback";
    } else if (error.response?.status === 500) {
      return "AI service temporarily unavailable";
    } else if (error.response?.status >= 500) {
      return "Server error - please try again later";
    } else if (error.response?.status >= 400) {
      return "Request failed - please check your data";
    } else if (error.code === 'NETWORK_ERROR') {
      return "Network error - please check your connection";
    } else {
      return "An unexpected error occurred";
    }
  }
}

export default FeedbackService;