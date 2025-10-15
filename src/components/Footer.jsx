/**
 * Footer component
 * Professional footer with copyright and optional links
 * Simple and clean design
 */

import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Copyright */}
          <div className="footer-copyright">
            <p>&copy; {currentYear} Onyma. All rights reserved.</p>
          </div>

          {/* Optional: Social Links or Navigation */}
          <div className="footer-links">
            <motion.a 
              href="#privacy" 
              className="footer-link"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#terms" 
              className="footer-link"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="mailto:hello@onyma.com" 
              className="footer-link"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Contact
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;

