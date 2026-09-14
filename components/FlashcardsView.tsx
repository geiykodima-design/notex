'use client'

import { motion } from 'framer-motion'

interface Flashcard {
  id: string
  question: string
  answer: string
  summary_id: string
}

interface FlashcardsViewProps {
  flashcards: Flashcard[]
}

export default function FlashcardsView({ flashcards }: FlashcardsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const current = flashcards[currentIndex]

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Card */}
      <div className="relative h-96">
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => setIsFlipped(!isFlipped)}
          className="w-full h-full cursor-pointer"
          style={{ perspective: '1000px' }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-white">
            <p className="text-sm opacity-70 mb-4">{isFlipped ? 'Відповідь' : 'Питання'}</p>
            <p className="text-2xl font-bold text-center">{isFlipped ? current.answer : current.question}</p>
          </div>
        </motion.div>
      </div>

      {/* Progress */}
      <div className="text-center">
        <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
          />
        </div>
        <p className="text-neutral-600 font-medium">
          {currentIndex + 1} / {flashcards.length}
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-6 py-3 border-2 border-slate-300 text-neutral-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Назад
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === flashcards.length - 1}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Далі
        </button>
      </div>
    </motion.div>
  )
}

import { useState } from 'react'
