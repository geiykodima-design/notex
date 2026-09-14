import React from 'react'

const QuizIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    className="w-16 h-16"
  >
    <defs>
      <linearGradient id="quizGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>

    <rect x="12" y="10" width="40" height="44" rx="4" fill="url(#quizGradient)" opacity="0.1" stroke="url(#quizGradient)" strokeWidth="2" />
    
    <circle cx="20" cy="24" r="3" fill="url(#quizGradient)" />
    <line x1="26" y1="23" x2="40" y2="23" stroke="url(#quizGradient)" strokeWidth="2" strokeLinecap="round" />
    
    <circle cx="20" cy="36" r="3" fill="url(#quizGradient)" />
    <line x1="26" y1="35" x2="40" y2="35" stroke="url(#quizGradient)" strokeWidth="2" strokeLinecap="round" />
    
    <circle cx="20" cy="48" r="3" fill="url(#quizGradient)" />
    <line x1="26" y1="47" x2="40" y2="47" stroke="url(#quizGradient)" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export default QuizIcon