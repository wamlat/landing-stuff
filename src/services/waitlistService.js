/**
 * Waitlist Service
 * Handles API calls for adding emails to the waitlist
 * Currently using a mock implementation that simulates API behavior
 * Replace the endpoint URL when backend is ready
 */

import axios from 'axios';

// Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.onyma.com';
const WAITLIST_ENDPOINT = `${API_BASE_URL}/waitlist`;

// Enable mock mode for development (set to false when backend is ready)
const MOCK_MODE = true;

/**
 * Adds an email to the waitlist
 * @param {string} email - The email address to add
 * @returns {Promise<Object>} Response object with success status and message
 */
export const addEmail = async (email) => {
  // Validate email format
  if (!email || !isValidEmail(email)) {
    throw new Error('Please enter a valid email address');
  }

  // Mock implementation for development
  if (MOCK_MODE) {
    return mockAddEmail(email);
  }

  // Real API call (use this when backend is ready)
  try {
    const response = await axios.post(WAITLIST_ENDPOINT, {
      email,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: response.data.message || 'Successfully joined the waitlist!',
      data: response.data,
    };
  } catch (error) {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      throw new Error(
        error.response.data.message || 'Failed to join waitlist. Please try again.'
      );
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other errors
      throw new Error('Something went wrong. Please try again.');
    }
  }
};

/**
 * Mock implementation that simulates API behavior
 * Simulates network delay and random success/failure
 * @param {string} email - The email address
 * @returns {Promise<Object>} Mock response
 */
const mockAddEmail = (email) => {
  return new Promise((resolve, reject) => {
    // Simulate network delay (1-2 seconds)
    const delay = 1000 + Math.random() * 1000;

    setTimeout(() => {
      // Simulate 95% success rate
      const shouldSucceed = Math.random() > 0.05;

      if (shouldSucceed) {
        resolve({
          success: true,
          message: '🎉 Success! You\'re on the waitlist!',
          data: {
            email,
            position: Math.floor(Math.random() * 1000) + 1,
            timestamp: new Date().toISOString(),
          },
        });
      } else {
        reject(new Error('Network error. Please try again.'));
      }
    }, delay);
  });
};

/**
 * Validates email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

