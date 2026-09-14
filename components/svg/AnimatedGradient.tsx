import React from 'react'

const AnimatedGradient = () => (
  <svg
    width="400"
    height="400"
    viewBox="0 0 400 400"
    className="w-full h-full"
    style={{
      filter: 'drop-shadow(0 20px 60px rgba(59, 130, 246, 0.15))',
    }}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
      </filter>
    </defs>

    <circle cx="200" cy="200" r="150" fill="url(#grad1)" opacity="0.08" />
    <circle cx="200" cy="200" r="100" fill="url(#grad1)" opacity="0.12" />
    <circle cx="200" cy="200" r="50" fill="url(#grad1)" opacity="0.15" />

    <g opacity="0.7">
      <rect x="140" y="120" width="120" height="160" rx="8" fill="none" stroke="url(#grad1)" strokeWidth="2" />
      <line x1="155" y1="145" x2="245" y2="145" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.5" />
      <line x1="155" y1="165" x2="245" y2="165" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.5" />
      <line x1="155" y1="185" x2="245" y2="185" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.5" />
      <line x1="155" y1="205" x2="220" y2="205" stroke="url(#grad1)" strokeWidth="1.5" opacity="0.5" />
    </g>

    <g opacity="0.4">
      <circle cx="280" cy="150" r="3" fill="url(#grad1)" />
      <circle cx="120" cy="280" r="3" fill="url(#grad1)" />
      <circle cx="300" cy="300" r="2" fill="url(#grad1)" />
    </g>
  </svg>
)

export default AnimatedGradient