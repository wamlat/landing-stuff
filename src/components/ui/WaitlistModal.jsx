import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      // Simulate API call (replace with real backend)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log email to console (in production, send to backend)
      console.log('✅ Waitlist signup:', email);
      console.log('📊 Timestamp:', new Date().toISOString());
      
      // Store in localStorage temporarily
      const waitlist = JSON.parse(localStorage.getItem('onyma_waitlist') || '[]');
      waitlist.push({
        email,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('onyma_waitlist', JSON.stringify(waitlist));

      setStatus('success');
      setMessage('🎉 You\'re on the list! Check your email for updates.');
      setEmail('');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 300);
      }, 2000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-neutral-600 dark:text-neutral-400" />
            </button>

            {/* Content */}
            <div className="text-center" style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>
              <h2 className="text-3xl font-bold mb-2 text-neutral-900 dark:text-white">
                Join the Waitlist
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Be the first to know when Onyma launches
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all"
                    disabled={status === 'loading' || status === 'success'}
                  />
                </div>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm p-3 rounded-lg ${
                      status === 'success'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="w-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-3 rounded-lg font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Joining...
                    </span>
                  ) : status === 'success' ? (
                    'Joined! ✓'
                  ) : (
                    'Join Waitlist'
                  )}
                </button>
              </form>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                We'll never share your email. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

