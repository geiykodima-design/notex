import React from 'react'

const CheckmarkIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    className="w-16 h-16"
  >
    <defs>
      <linearGradient id="checkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>

    <circle cx="32" cy="32" r="28" fill="url(#checkGradient)" opacity="0.08" stroke="url(#checkGradient)" strokeWidth="2" />
    <path
      d="M 22 32 L 28 38 L 42 24"
      stroke="url(#checkGradient)"
      strokeWidth="3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default CheckmarkIcon