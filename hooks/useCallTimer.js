import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";

export const useCallTimer = (interviewInfo) => {
  const [callDuration, setCallDuration] = useState(0);
  const callTimerRef = useRef(null);
  const startTimeRef = useRef(null);

  // Start the call timer
  const startTimer = useCallback(() => {
    
    // Clear any existing timer first
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }
    
    // Set the start time
    startTimeRef.current = Date.now();
    
    callTimerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
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
      }
    }, 1000);
    
  }, [interviewInfo]);

  // Stop the call timer
  const stopTimer = useCallback(() => {
    
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    } else {
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