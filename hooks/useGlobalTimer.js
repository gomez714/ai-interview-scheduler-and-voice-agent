import { useState, useEffect, useCallback } from "react";
import timerManager from "@/utils/TimerManager";

export const useGlobalTimer = () => {
  const [callDuration, setCallDuration] = useState(0);

  console.log('🔥 GLOBAL TIMER HOOK: useGlobalTimer instantiated');

  // Set up listener for timer updates - ONLY run once on mount
  useEffect(() => {
    
    const updateDuration = (duration) => {
      setCallDuration(duration);
    };

    timerManager.addListener(updateDuration);

    // Get initial duration
    setCallDuration(timerManager.getDuration());

    return () => {
      timerManager.removeListener(updateDuration);
      // DO NOT call cleanup() here - that would stop the timer!
    };
  }, []); // Empty dependency array - only run once

  const startTimer = useCallback((interviewInfo) => {
    timerManager.start(interviewInfo);
  }, []);

  const stopTimer = useCallback(() => {
    timerManager.stop();
  }, []);

  const formatDuration = useCallback((seconds) => {
    return timerManager.formatDuration(seconds);
  }, []);

  const cleanup = useCallback(() => {
    timerManager.cleanup();
  }, []);

  return {
    callDuration,
    startTimer,
    stopTimer,
    formatDuration,
    cleanup,
  };
};