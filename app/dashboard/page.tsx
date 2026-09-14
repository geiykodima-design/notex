'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Upload, Plus } from 'lucide-react'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/auth/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  if (loading) return <div className="flex items-center justify-center min-h-screen">Завантаження...</div>

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Твої матеріали</h1>
          <p className="text-neutral-600 mb-8">Привіт, {user?.email}!</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Upload card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="card-container border-2 border-dashed border-slate-300 flex flex-col items-center justify-center min-h-64 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload size={48} className="text-neutral-400 mb-4" />
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Завантажити матеріал</h3>
              <p className="text-neutral-600 text-center">PDF, DOCX або текст</p>
              <p className="text-sm text-neutral-500 mt-4">До 10 МБ</p>
            </motion.div>
          </div>

          <div className="mt-12">
            <p className="text-center text-neutral-600 py-12">
              Поки що матеріалів немає. Завантажи свій перший матеріал, щоб почати!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
