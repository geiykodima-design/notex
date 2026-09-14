'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface QuizQuestion {
  id: string
  question: string
  correct_answer: string
  options: string[]
  explanation: string
}

interface Quiz {
  id: string
  questions: QuizQuestion[]
}

interface QuizViewProps {
  quiz: Quiz
}

export default function QuizView({ quiz }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)

  const current = quiz.questions[currentIndex]
  const isCorrect = selectedAnswer === current.correct_answer

  const handleAnswer = (answer: string) => {
    if (answered) return
    setSelectedAnswer(answer)
    setAnswered(true)
    if (answer === current.correct_answer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    }
  }

  if (currentIndex === quiz.questions.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl p-12 text-center border border-slate-200"
      >
        <h2 className="text-4xl font-bold text-neutral-900 mb-4">Вікторина завершена!</h2>
        <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">
          {score} / {quiz.questions.length}
        </div>
        <p className="text-neutral-600 text-lg mb-8">
          Правильних відповідей: {Math.round((score / quiz.questions.length) * 100)}%
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow">
          Спробувати знову
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Progress */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-neutral-600">Прогрес</p>
          <p className="text-sm font-semibold text-neutral-900">
            {currentIndex + 1} / {quiz.questions.length}
          </p>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-neutral-900 mb-8">{current.question}</h3>

        {/* Options */}
        <div className="space-y-4">
          {current.options.map((option, i) => {
            const isSelected = selectedAnswer === option
            const isCorrectOption = option === current.correct_answer
            const showAsCorrect = answered && isCorrectOption
            const showAsIncorrect = answered && isSelected && !isCorrectOption

            return (
              <motion.button
                key={i}
                onClick={() => handleAnswer(option)}
                disabled={answered}
                whileHover={!answered ? { scale: 1.02 } : {}}
                className={`w-full p-4 rounded-lg border-2 font-semibold text-left transition-all ${
                  showAsCorrect
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : showAsIncorrect
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                {option}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border-2 ${
            isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}
        >
          <p className="font-semibold mb-2">{isCorrect ? 'Правильно!' : 'Пояснення:'}</p>
          <p>{current.explanation}</p>
        </motion.div>
      )}

      {/* Next button */}
      {answered && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
          >
            {currentIndex === quiz.questions.length - 1 ? 'Завершити' : 'Далі'}
          </button>
        </div>
      )}
    </motion.div>
  )
}
