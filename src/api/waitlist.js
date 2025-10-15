/**
 * Waitlist API Handler
 * This is a mock implementation. In production, you would:
 * 1. Store emails in a database (e.g., PostgreSQL, MongoDB)
 * 2. Use a service like Mailchimp, SendGrid, or ConvertKit
 * 3. Send confirmation emails
 * 4. Add rate limiting and spam protection
 */

// Mock in-memory storage (for demo purposes only)
let waitlistEmails = [];

export const addEmailToWaitlist = async (email) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    if (waitlistEmails.includes(email)) {
      return {
        success: false,
        error: 'This email is already on the waitlist',
      };
    }

    // Add email to waitlist
    waitlistEmails.push({
      email,
      timestamp: new Date().toISOString(),
    });

    // Log to console (in production, save to database)
    console.log('✅ New waitlist signup:', email);
    console.log('📊 Total signups:', waitlistEmails.length);

    return {
      success: true,
      message: 'Successfully joined the waitlist!',
    };
  } catch (error) {
    console.error('Error adding email to waitlist:', error);
    return {
      success: false,
      error: 'Failed to join waitlist',
    };
  }
};

export const getWaitlistEmails = () => {
  return waitlistEmails;
};

export const getWaitlistCount = () => {
  return waitlistEmails.length;
};

