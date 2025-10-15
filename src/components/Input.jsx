/**
 * Reusable Input component
 * Professional text input with proper accessibility and styling
 * Supports different types, placeholder, and controlled component pattern
 */

import React from 'react';
import './Input.css';

function Input({ 
  type = 'text', 
  placeholder = '', 
  value = '', 
  onChange, 
  disabled = false,
  required = false,
  name = '',
  id = '',
  className = ''
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      name={name}
      id={id}
      className={`input ${className}`}
      aria-label={placeholder}
    />
  );
}

export default Input;

