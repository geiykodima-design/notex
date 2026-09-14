'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import FileUploadZone from '@/components/FileUploadZone'
import SourceList from '@/components/SourceList'
import { Source } from '@/lib/types'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [sources, setSources] = useState<Source[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/auth/login')
        return
      }
      setUser(data.user)
      await fetchSources(data.user.id)
      setLoading(false)
    }
    checkAuth()
  }, [])

  const fetchSources = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('sources')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setSources(data || [])
    } catch (err) {
      console.error('Error fetching sources:', err)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!user) return

    setUploading(true)
    try {
      // Parse file content
      let rawText = ''
      const fileType = file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.docx') ? 'docx' : 'text'

      if (fileType === 'pdf') {
        // For PDF, we'll use a simple placeholder - real implementation needs pdf-parse
        rawText = `[PDF Content: ${file.name}]\n[File parsing will be implemented with pdf-parse library]`
      } else if (fileType === 'docx') {
        rawText = `[DOCX Content: ${file.name}]\n[File parsing will be implemented with mammoth.js library]`
      } else {
        // Text file
        rawText = await file.text()
      }

      // Save to database
      const { data, error } = await supabase.from('sources').insert([
        {
          user_id: user.id,
          filename: file.name,
          file_type: fileType,
          raw_text: rawText,
        },
      ])

      if (error) throw error

      // Refresh sources list
      await fetchSources(user.id)
    } catch (err) {
      console.error('Error uploading file:', err)
      alert('Помилка при завантаженні файлу')
    } finally {
      setUploading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto mb-4 animate-pulse" />
          <p className="text-neutral-600">Завантаження...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-2">Мої матеріали</h1>
              <p className="text-neutral-600 text-lg">Привіт, {user?.email}</p>
            </div>
            <div className="hidden md:flex flex-col items-end text-right">
              <p className="text-sm text-neutral-600 mb-1">Вільних конспектів цього місяця</p>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">3</div>
            </div>
          </div>
        </motion.div>

        {/* Upload Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <FileUploadZone onFileUpload={handleFileUpload} uploading={uploading} />
        </motion.div>

        {/* Sources List */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-12">
          {sources.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Твої матеріали ({sources.length})</h2>
              <SourceList sources={sources} />
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-neutral-600 text-lg mb-4">Поки що матеріалів немає</p>
              <p className="text-neutral-500">Завантаж свій перший файл, щоб почати!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
