/**
 * Hero Section component
 * Main landing page section with headline, tagline, description
 * Contains email signup form for waitlist with full state management
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from './Input';
import Button from './Button';
import { addEmail } from '../services/waitlistService';
import '../styles/HeroSection.css';

function HeroSection() {
  // State management
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  /**
   * Handles email input change
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear error message when user starts typing again
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  };

  /**
   * Handles form submission
   * Validates email and calls waitlist service
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email is not empty
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    // Set loading state
    setStatus('loading');
    setMessage('');

    try {
      // Call the waitlist service
      const response = await addEmail(email);
      
      // Success! Show success message
      setStatus('success');
      setMessage(response.message);
      
      // Clear the email input after successful submission
      setEmail('');

      // Reset to idle after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      // Error occurred
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Main Headline with animation */}
        <motion.h1 
          className="hero-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Welcome to Onyma
        </motion.h1>

        {/* Tagline */}
        <motion.p 
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The Future of Innovation
        </motion.p>

        {/* Description */}
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Join our exclusive waitlist to be among the first to experience 
          something truly remarkable. We're building the next generation 
          of tools that will transform the way you work.
        </motion.p>

        {/* Waitlist Signup Form */}
        <motion.form 
          className="hero-form" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="hero-form-row">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleEmailChange}
              disabled={status === 'loading' || status === 'success'}
              required
            />
            <Button 
              type="submit" 
              variant="primary"
              loading={status === 'loading'}
              disabled={status === 'success'}
            >
              Join Waitlist
            </Button>
          </div>

          {/* Feedback Messages */}
          {message && (
            <motion.div 
              className={`hero-feedback ${status}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {message}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default HeroSection;

