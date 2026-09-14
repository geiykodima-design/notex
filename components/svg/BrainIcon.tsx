import React from 'react'

const BrainIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    className="w-16 h-16"
  >
    <defs>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>

    <path
      d="M 20 28 Q 16 20 16 14 Q 16 8 22 8 Q 26 8 28 14 M 44 28 Q 48 20 48 14 Q 48 8 42 8 Q 38 8 36 14"
      fill="none"
      stroke="url(#brainGradient)"
      strokeWidth="2"
    />
    
    <ellipse cx="32" cy="32" rx="18" ry="20" fill="none" stroke="url(#brainGradient)" strokeWidth="2" />
    
    <circle cx="24" cy="32" r="5" fill="url(#brainGradient)" opacity="0.3" />
    <circle cx="40" cy="32" r="5" fill="url(#brainGradient)" opacity="0.3" />
    <circle cx="32" cy="24" r="4" fill="url(#brainGradient)" opacity="0.3" />
    
    <path d="M 20 45 Q 32 52 44 45" fill="none" stroke="url(#brainGradient)" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export default BrainIcon