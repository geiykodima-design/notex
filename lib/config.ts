// Configuration constants

export const APP_CONFIG = {
  // App metadata
  APP_NAME: 'Notex',
  APP_TAGLINE: 'Вчися краще з ШІ',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // File upload
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  ALLOWED_EXTENSIONS: ['.pdf', '.docx', '.txt'],

  // API
  API_TIMEOUT: 30000, // 30 seconds

  // Limits
  FREE_TIER_SUMMARIES_PER_MONTH: 3,
  FREE_TIER_FLASHCARDS_PER_SUMMARY: 20,
  FREE_TIER_QUIZ_QUESTIONS: 10,

  // Generation
  FLASHCARDS_DEFAULT_COUNT: 15,
  QUIZ_DEFAULT_QUESTIONS: 5,
}

export const GEMINI_CONFIG = {
  MODEL: 'gemini-1.5-flash',
  API_URL: 'https://generativelanguage.googleapis.com/v1beta/models',
  TEMPERATURE: 0.7,
  TOP_K: 40,
  TOP_P: 0.95,
}
