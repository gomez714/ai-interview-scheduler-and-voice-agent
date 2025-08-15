import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

export const useCallTimer = (interviewInfo) => {
  const [callDuration, setCallDuration] = useState(0);
  const callTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Start the call timer
  const startTimer = useCallback(() => {
    console.log("startTimer called");
    console.log("startTimeRef.current:", startTimeRef.current);
    
    // Clear any existing timer first
    if (callTimerRef.current) {
      console.log("Clearing existing timer");
      clearInterval(callTimerRef.current);
    }
    
    // Set the start time
    startTimeRef.current = Date.now();
    console.log("startTimeRef.current set to:", startTimeRef.current);
    
    callTimerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        console.log("Timer tick - elapsed seconds:", elapsed);
        setCallDuration(elapsed);

        // Get interview duration in seconds
        const maxDurationSeconds =
          (interviewInfo?.interviewDetails?.duration || 30) * 60;

        // Warning at 80% of time
        const warningTime = Math.floor(maxDurationSeconds * 0.8);
        const finalWarningTime = Math.floor(maxDurationSeconds * 0.9);

        if (elapsed === warningTime) {
          toast.warning("Interview will end in a few minutes");
        }

        if (elapsed === finalWarningTime) {
          toast.warning("Interview ending soon - prepare for final thoughts");
        }
      } else {
        console.log("Timer tick - startTimeRef.current is null");
      }
    }, 1000);
    
    console.log("Timer interval set with ID:", callTimerRef.current);
  }, [interviewInfo]);

  // Stop the call timer
  const stopTimer = useCallback(() => {
    console.log("stopTimer called");
    
    if (callTimerRef.current) {
      console.log("Clearing timer with ID:", callTimerRef.current);
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    } else {
      console.log("No timer to clear");
    }
    
    // Reset start time and duration
    startTimeRef.current = null;
    setCallDuration(0);
  }, []);

  // Format duration for display
  const formatDuration = useCallback((seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Cleanup function to be called on unmount
  const cleanup = useCallback(() => {
    if (callTimerRef.current) {
      console.log("useCallTimer cleanup - clearing timer");
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    startTimeRef.current = null;
    setCallDuration(0);
  }, []);

  return {
    callDuration,
    startTimer,
    stopTimer,
    formatDuration,
    cleanup,
  };
};