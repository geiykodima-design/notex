import React from 'react'

const DocumentIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    className="w-16 h-16"
  >
    <defs>
      <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>

    <rect x="12" y="8" width="40" height="48" rx="4" fill="url(#docGradient)" opacity="0.1" stroke="url(#docGradient)" strokeWidth="2" />
    <line x1="20" y1="20" x2="44" y2="20" stroke="url(#docGradient)" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="30" x2="44" y2="30" stroke="url(#docGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="20" y1="40" x2="44" y2="40" stroke="url(#docGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    <line x1="20" y1="50" x2="32" y2="50" stroke="url(#docGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
  </svg>
)

export default DocumentIcon