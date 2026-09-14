'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Summary } from '@/lib/types'
import FlashcardsView from '@/components/FlashcardsView'
import QuizView from '@/components/QuizView'
import ChatView from '@/components/ChatView'
import { Sparkles } from 'lucide-react'

interface GenerateButtonsProps {
  summaryId: string
  type: 'flashcards' | 'quiz' | 'chat'
  summary: Summary
}

export default function GenerateButtons({ summaryId, type, summary }: GenerateButtonsProps) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const endpoint =
        type === 'flashcards'
          ? '/api/flashcards/generate'
          : type === 'quiz'
            ? '/api/quizzes/generate'
            : '/api/chat/message'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summaryId, ...(type === 'chat' && { message: 'Привіт! Я готов учити цей матеріал.' }) }),
      })

      if (!response.ok) throw new Error('Failed to generate')
      const result = await response.json()
      setData(result)
    } catch (err) {
      console.error('Error:', err)
      alert(`Помилка при генерації ${type}`)
    } finally {
      setLoading(false)
    }
  }

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-300"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          {type === 'flashcards' ? 'Створи картки' : type === 'quiz' ? 'Створи тест' : 'Запусти репетитора'}
        </h3>
        <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
          {type === 'flashcards'
            ? 'ШІ створить картки для повторення ключових концепцій'
            : type === 'quiz'
              ? 'Перевір себе з автоматично сформованим тестом'
              : 'Спілкуйся з ШІ, яка знає твій матеріал'}
        </p>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
        >
          {loading ? 'Генеруємо...' : 'Почати'}
        </button>
      </motion.div>
    )
  }

  return (
    <>
      {type === 'flashcards' && data.flashcards && <FlashcardsView flashcards={data.flashcards} />}
      {type === 'quiz' && data.quiz && <QuizView quiz={data.quiz} />}
      {type === 'chat' && <ChatView summaryId={summaryId} initialMessage={data.message} />}
    </>
  )
}
