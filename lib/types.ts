// Type definitions for the application

export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
}

export interface Source {
  id: string
  user_id: string
  filename: string
  file_type: 'pdf' | 'docx' | 'text'
  raw_text: string
  created_at: string
  updated_at: string
}

export interface Summary {
  id: string
  user_id: string
  source_id: string
  title: string
  content: string
  created_at: string
  updated_at?: string
}

export interface Flashcard {
  id: string
  summary_id: string
  question: string
  answer: string
  order_index?: number
  created_at?: string
}

export interface Quiz {
  id: string
  summary_id: string
  created_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question: string
  correct_answer: string
  options: string[]
  explanation: string
  order_index?: number
  created_at?: string
}

export interface ChatSession {
  id: string
  user_id: string
  summary_id: string
  created_at: string
}

export interface ChatMessage {
  id: string
  session_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface UsageLimit {
  id: string
  user_id: string
  summaries_used: number
  summaries_limit: number
  month_start: string
  created_at: string
}
