/**
 * Reusable Button component
 * Professional button with loading state and variants
 * Supports primary, secondary styles and disabled states
 */

import React from 'react';
import './Button.css';

function Button({ 
  children, 
  onClick, 
  type = 'button',
  disabled = false,
  loading = false,
  variant = 'primary',
  className = ''
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`button button--${variant} ${className} ${loading ? 'button--loading' : ''}`}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <span className="spinner" aria-hidden="true"></span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;

