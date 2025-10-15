/**
 * Header component
 * Displays the Onyma logo and navigation (if needed in the future)
 * Sticky header with clean, professional design
 */

import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

function Header() {
  return (
    <motion.header 
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <div className="header-content">
          {/* Logo Section */}
          <div className="logo">
            <motion.span 
              className="logo-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Onyma
            </motion.span>
          </div>

          {/* Optional: Navigation can be added here */}
          {/* <nav className="nav">
            <a href="#features">Features</a>
            <a href="#about">About</a>
          </nav> */}
        </div>
      </div>
    </motion.header>
  );
}

export default Header;

