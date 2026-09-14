'use client'

import { Summary } from '@/lib/types'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

interface SummarySectionProps {
  summary: Summary
  onRegenerate: () => void
}

export default function SummarySection({ summary, onRegenerate }: SummarySectionProps) {
  // Parse markdown and render content
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={i} className="text-3xl font-bold text-neutral-900 mt-8 mb-4">
            {line.replace('# ', '')}
          </h1>
        )
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={i} className="text-2xl font-bold text-neutral-900 mt-6 mb-3">
            {line.replace('## ', '')}
          </h2>
        )
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={i} className="text-xl font-semibold text-neutral-800 mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        )
      }
      if (line.startsWith('- ')) {
        return (
          <li key={i} className="text-neutral-700 ml-6 mb-2">
            {line.replace('- ', '')}
          </li>
        )
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <p key={i} className="text-neutral-700 font-semibold mb-2">
            {line.replace(/\*\*/g, '')}
          </p>
        )
      }
      if (line.trim() === '') {
        return <div key={i} className="mb-2" />
      }
      return (
        <p key={i} className="text-neutral-700 leading-relaxed mb-3">
          {line}
        </p>
      )
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Summary header */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">{summary.title}</h2>
            <p className="text-sm text-neutral-500">
              Створено {new Date(summary.created_at).toLocaleDateString('uk-UA')}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm prose prose-sm max-w-none">
        <div className="space-y-4">{renderContent(summary.content)}</div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 justify-center pt-4">
        <button
          onClick={onRegenerate}
          className="px-6 py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Перегенерувати
        </button>
        <button className="px-6 py-3 border-2 border-slate-300 text-neutral-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
          Завантажити PDF
        </button>
      </div>
    </motion.div>
  )
}
