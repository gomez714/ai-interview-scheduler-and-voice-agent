import { useState } from 'react';
import { toast } from 'sonner';

export const useJobExtraction = () => {
  const [isExtracting, setIsExtracting] = useState(false);

  const extractJobDescription = async (url) => {
    if (!url?.trim()) {
      toast.error("Please enter a job posting URL");
      return null;
    }

    setIsExtracting(true);
    try {
      const response = await fetch("/api/extract-job-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to extract job description");
      }

      toast.success("Job description extracted successfully!");
      return data;

    } catch (error) {
      console.error("Error extracting job description:", error);
      toast.error(error.message || "Failed to extract job description");
      return null;
    } finally {
      setIsExtracting(false);
    }
  };

  return { extractJobDescription, isExtracting };
};
