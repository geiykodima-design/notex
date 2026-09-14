'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Toast from '@/components/Toast'
import { FileDown } from 'lucide-react'
import { exportSummary, exportFlashcards } from '@/lib/export'

interface ExportMenuProps {
  content: string
  title: string
  type: 'summary' | 'flashcards'
  flashcards?: any[]
}

export default function ExportMenu({ content, title, type, flashcards }: ExportMenuProps) {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleExport = async (format: 'pdf' | 'markdown' | 'txt' | 'json') => {
    try {
      if (type === 'summary') {
        await exportSummary(content, title, {
          format: format as 'pdf' | 'markdown' | 'txt',
          includeMetadata: true,
        })
      } else if (type === 'flashcards' && flashcards) {
        await exportFlashcards(flashcards, title)
      }

      setToast({ message: `Файл завантажено успішно!`, type: 'success' })
      setOpen(false)
    } catch (error) {
      setToast({ message: 'Помилка при завантаженні файлу', type: 'error' })
    }
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          <FileDown size={18} />
          Завантажити
        </button>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden min-w-max z-50"
          >
            {type === 'summary' && (
              <>
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full px-6 py-3 text-left hover:bg-slate-50 transition-colors font-medium text-neutral-900 border-b border-slate-100"
                >
                  PDF
                </button>
                <button
                  onClick={() => handleExport('markdown')}
                  className="w-full px-6 py-3 text-left hover:bg-slate-50 transition-colors font-medium text-neutral-900 border-b border-slate-100"
                >
                  Markdown
                </button>
                <button
                  onClick={() => handleExport('txt')}
                  className="w-full px-6 py-3 text-left hover:bg-slate-50 transition-colors font-medium text-neutral-900"
                >
                  Text
                </button>
              </>
            )}

            {type === 'flashcards' && (
              <button
                onClick={() => handleExport('json')}
                className="w-full px-6 py-3 text-left hover:bg-slate-50 transition-colors font-medium text-neutral-900"
              >
                JSON
              </button>
            )}
          </motion.div>
        )}
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  )
}
