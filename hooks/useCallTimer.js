import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";

export const useCallTimer = (interviewInfo) => {
  const [callDuration, setCallDuration] = useState(0);
  const callTimerRef = useRef(null);
  const startTimeRef = useRef(null);
  const isActiveRef = useRef(false); // Track if timer is active to prevent multiple instances

  // Start the call timer
  const startTimer = useCallback(() => {
    
    // Don't start if already active
    if (isActiveRef.current && callTimerRef.current) {
      return;
    }
    
    // Clear any existing timer first
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }
    
    // Set the start time and mark as active
    startTimeRef.current = Date.now();
    isActiveRef.current = true;
    
    // Get interview duration once and store it
    const maxDurationSeconds = (interviewInfo?.interviewDetails?.duration || 30) * 60;
    const warningTime = Math.floor(maxDurationSeconds * 0.8);
    const finalWarningTime = Math.floor(maxDurationSeconds * 0.9);
    
    callTimerRef.current = setInterval(() => {
      if (startTimeRef.current && isActiveRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setCallDuration(elapsed);

        if (elapsed === warningTime) {
          toast.warning("Interview will end in a few minutes");
        }

        if (elapsed === finalWarningTime) {
          toast.warning("Interview ending soon - prepare for final thoughts");
        }
      } else {
      }
    }, 1000);
    
    
  }, []); // Remove interviewInfo dependency to prevent re-creation

  // Stop the call timer
  const stopTimer = useCallback(() => {
    
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    } else {
    }
    
    // Reset start time, duration and active status
    startTimeRef.current = null;
    isActiveRef.current = false;
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
    } else {
    }
    startTimeRef.current = null;
    isActiveRef.current = false;
    setCallDuration(0);
  }, []);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    callDuration,
    startTimer,
    stopTimer,
    formatDuration,
    cleanup,
  };
};