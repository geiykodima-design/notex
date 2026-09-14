'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data?.user)
      setLoading(false)
    }
    checkUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"></div>
            <span className="font-bold text-lg text-neutral-900">Notex</span>
          </Link>

          <div className="flex items-center gap-4">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard" className="text-neutral-700 hover:text-neutral-900 font-medium">
                      Панель
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn-secondary text-sm"
                    >
                      Вихід
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-neutral-700 hover:text-neutral-900 font-medium">
                      Вхід
                    </Link>
                    <Link href="/auth/signup" className="btn-primary text-sm">
                      Реєстрація
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
