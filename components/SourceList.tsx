'use client'

import { motion } from 'framer-motion'
import { Source } from '@/lib/types'
import Link from 'next/link'
import { ChevronRight, FileText, Clock } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface SourceListProps {
  sources: Source[]
}

export default function SourceList({ sources }: SourceListProps) {
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (sourceId: string) => {
    if (!confirm('Видалити цей матеріал?')) return

    setDeleting(sourceId)
    try {
      const { error } = await supabase.from('sources').delete().eq('id', sourceId)
      if (error) throw error
    } catch (err) {
      console.error('Error deleting source:', err)
      alert('Помилка при видаленні')
    } finally {
      setDeleting(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('uk-UA', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const getFileIcon = (fileType: string) => {
    const iconClass = 'w-5 h-5'
    if (fileType === 'pdf') return <FileText className={`${iconClass} text-red-500`} />
    if (fileType === 'docx') return <FileText className={`${iconClass} text-blue-500`} />
    return <FileText className={`${iconClass} text-neutral-500`} />
  }

  return (
    <div className="space-y-4">
      {sources.map((source, i) => (
        <motion.div
          key={source.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          whileHover={{ y: -2 }}
          className="group"
        >
          <Link href={`/dashboard/${source.id}`}>
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                    {getFileIcon(source.file_type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-neutral-900 truncate group-hover:text-blue-600 transition-colors">
                      {source.filename}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-neutral-500">
                        <Clock size={14} />
                        {formatDate(source.created_at)}
                      </div>
                      <div className="text-sm text-neutral-500 bg-slate-100 px-3 py-1 rounded-full">
                        {source.file_type.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: 10 }}
                  whileHover={{ x: 15 }}
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleDelete(source.id)
                    }}
                    disabled={deleting === source.id}
                    className="text-sm text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                  >
                    {deleting === source.id ? 'Видалення...' : 'Видалити'}
                  </button>
                  <ChevronRight className="w-5 h-5 text-blue-500" />
                </motion.div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
