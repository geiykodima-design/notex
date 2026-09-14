export type Source = {
  id: string
  user_id: string
  filename: string
  file_type: 'pdf' | 'docx' | 'text'
  raw_text: string
  created_at: string
}

export type Summary = {
  id: string
  user_id: string
  source_id: string
  title: string
  content: string
  created_at: string
}

export type Flashcard = {
  id: string
  summary_id: string
  question: string
  answer: string
  order: number
}

export type Quiz = {
  id: string
  summary_id: string
  created_at: string
}

export type QuizQuestion = {
  id: string
  quiz_id: string
  question: string
  correct_answer: string
  options: string[]
  explanation: string
}

export type User = {
  id: string
  email: string
  created_at: string
}
