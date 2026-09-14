import React from 'react'

const SparkleIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    className="w-12 h-12"
  >
    <defs>
      <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>

    <path
      d="M 24 6 L 28 18 L 40 20 L 28 22 L 24 34 L 20 22 L 8 20 L 20 18 Z"
      fill="url(#sparkleGradient)"
      opacity="0.8"
    />

    <circle cx="8" cy="12" r="2" fill="url(#sparkleGradient)" opacity="0.5" />
    <circle cx="40" cy="12" r="2" fill="url(#sparkleGradient)" opacity="0.5" />
    <circle cx="12" cy="36" r="1.5" fill="url(#sparkleGradient)" opacity="0.4" />
  </svg>
)

export default SparkleIcon