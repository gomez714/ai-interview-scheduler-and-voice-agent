/**
 * Email template utilities for creating formatted email content
 */

/**
 * Creates an interview invitation email with subject and body
 * @param {Object} interview - Interview object containing job details
 * @param {string} url - Interview URL link
 * @returns {Object} Object containing encoded subject and body for mailto
 */
export const createInterviewInvitationEmail = (interview, url) => {
  const subject = encodeURIComponent(
    `Interview Invitation - ${interview?.jobPosition}`
  );

  const body = encodeURIComponent(`Hello,

You are invited to participate in an AI-powered interview for the ${interview?.jobPosition} position.

Interview Details:
• Position: ${interview?.jobPosition}
• Duration: ${interview?.duration} minutes
• Platform: RoleCall AI Interview System

Interview Link: ${url}

Instructions:
1. Click the link above or copy it to your browser
2. Enter your full name and email when prompted
3. Test your microphone and ensure a stable internet connection
4. Find a quiet environment for the interview

Please complete the interview at your earliest convenience. If you have any questions or technical issues, feel free to reach out.

Best regards,
The Recruitment Team`);

  return { subject, body };
};

/**
 * Opens the default email client with pre-filled interview invitation
 * @param {Object} interview - Interview object
 * @param {string} url - Interview URL
 */
export const sendInterviewInvitation = (interview, url) => {
  const { subject, body } = createInterviewInvitationEmail(interview, url);
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};

/**
 * Email template constants for reusability
 */
export const EMAIL_SIGNATURES = {
  RECRUITMENT_TEAM: "Best regards,\nThe Recruitment Team",
  HIRING_MANAGER: "Best regards,\nHiring Manager",
};

/**
 * Email subject line templates
 */
export const EMAIL_SUBJECTS = {
  INTERVIEW_INVITATION: (position) => `Interview Invitation - ${position}`,
  INTERVIEW_REMINDER: (position) => `Reminder: Interview Scheduled - ${position}`,
  INTERVIEW_COMPLETION: (position) => `Interview Completed - ${position}`,
};