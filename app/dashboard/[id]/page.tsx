'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Source, Summary } from '@/lib/types'
import SummarySection from '@/components/SummarySection'
import GenerateButtons from '@/components/GenerateButtons'
import LoadingState from '@/components/LoadingState'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function SourceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const sourceId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [source, setSource] = useState<Source | null>(null)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'summary' | 'flashcards' | 'quiz' | 'chat'>('summary')

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/auth/login')
        return
      }

      setUser(data.user)
      await fetchSourceData(data.user.id)
      setLoading(false)
    }

    checkAuthAndFetch()
  }, [sourceId])

  const fetchSourceData = async (userId: string) => {
    try {
      // Fetch source
      const { data: sourceData, error: sourceError } = await supabase
        .from('sources')
        .select('*')
        .eq('id', sourceId)
        .eq('user_id', userId)
        .single()

      if (sourceError) throw sourceError
      setSource(sourceData)

      // Fetch existing summary
      const { data: summaryData } = await supabase
        .from('summaries')
        .select('*')
        .eq('source_id', sourceId)
        .eq('user_id', userId)
        .single()

      if (summaryData) {
        setSummary(summaryData)
      }
    } catch (err) {
      console.error('Error fetching data:', err)
    }
  }

  const handleGenerateSummary = async () => {
    if (!sourceId) return

    setGenerating(true)
    try {
      const response = await fetch('/api/summaries/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId }),
      })

      if (!response.ok) throw new Error('Failed to generate summary')
      const { summary: newSummary } = await response.json()
      setSummary(newSummary)
    } catch (err) {
      console.error('Error:', err)
      alert('Помилка при генерації конспекту')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) return <LoadingState />

  if (!source) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600 mb-4">Матеріал не знайдено</p>
          <Link href="/dashboard" className="text-blue-500 hover:underline font-semibold">
            Повернутися до панелі
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">{source.filename}</h1>
                <p className="text-sm text-neutral-500">Тип: {source.file_type.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-8 border-b border-slate-200 overflow-x-auto"
        >
          {(['summary', 'flashcards', 'quiz', 'chat'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold text-sm transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab === 'summary'
                ? 'Конспект'
                : tab === 'flashcards'
                  ? 'Картки'
                  : tab === 'quiz'
                    ? 'Тест'
                    : 'Репетитор'}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'summary' && (
            <div>
              {!summary ? (
                <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-300">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">Ще немає конспекту</h3>
                  <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
                    Натисни кнопку нижче, щоб ШІ створив структурований конспект з твого матеріалу
                  </p>
                  <button
                    onClick={handleGenerateSummary}
                    disabled={generating}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50"
                  >
                    {generating ? 'Генеруємо...' : 'Генерувати конспект'}
                  </button>
                </div>
              ) : (
                <SummarySection summary={summary} onRegenerate={handleGenerateSummary} />
              )}
            </div>
          )}

          {activeTab === 'flashcards' && summary && (
            <GenerateButtons
              summaryId={summary.id}
              type="flashcards"
              summary={summary}
            />
          )}

          {activeTab === 'quiz' && summary && (
            <GenerateButtons
              summaryId={summary.id}
              type="quiz"
              summary={summary}
            />
          )}

          {activeTab === 'chat' && summary && (
            <GenerateButtons
              summaryId={summary.id}
              type="chat"
              summary={summary}
            />
          )}

          {!summary && activeTab !== 'summary' && (
            <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-300">
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
Потрібен конспект</h3>
              <p className="text-neutral-600 mb-8">Спочатку створи конспект, щоб відкрити інші функції</p>
              <button
                onClick={() => {
                  setActiveTab('summary')
                  handleGenerateSummary()
                }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow"
              >
                Поїхали!
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
