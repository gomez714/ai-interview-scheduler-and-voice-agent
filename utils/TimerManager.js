import { toast } from "sonner";

// Global timer manager that exists outside React's render cycle
class TimerManager {
  constructor() {
    this.timerId = null;
    this.startTime = null;
    this.isActive = false;
    this.duration = 0;
    this.listeners = new Set();
    this.maxDurationSeconds = 30 * 60; // default 30 minutes
  }

  addListener(callback) {
    this.listeners.add(callback);
    // Immediately call with current duration
    callback(this.duration);
  }

  removeListener(callback) {
    this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.duration));
  }

  start(interviewInfo) {

    // Don't start if already active
    if (this.isActive && this.timerId) {
      console.log('🔥 TIMER MANAGER: Timer already active, skipping start');
      return;
    }

    // Clear any existing timer
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    // Set configuration
    this.startTime = Date.now();
    this.isActive = true;
    this.duration = 0;
    this.maxDurationSeconds = (interviewInfo?.interviewDetails?.duration || 30) * 60;
    
    const warningTime = Math.floor(this.maxDurationSeconds * 0.8);
    const finalWarningTime = Math.floor(this.maxDurationSeconds * 0.9);


    this.timerId = setInterval(() => {
      if (this.startTime && this.isActive) {
        this.duration = Math.floor((Date.now() - this.startTime) / 1000);
        
        this.notifyListeners();

        if (this.duration === warningTime) {
          toast.warning("Interview will end in a few minutes");
        }

        if (this.duration === finalWarningTime) {
          toast.warning("Interview ending soon - prepare for final thoughts");
        }
      }
    }, 1000);

    this.notifyListeners();
  }

  stop() {

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    } else {
    }

    this.startTime = null;
    this.isActive = false;
    this.duration = 0;
    this.notifyListeners();
  }

  cleanup() {
    this.stop();
    this.listeners.clear();
  }

  formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  getDuration() {
    return this.duration;
  }

  isTimerActive() {
    return this.isActive;
  }
}

// Create a singleton instance
const timerManager = new TimerManager();

export default timerManager;