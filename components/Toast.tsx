'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  setTimeout(() => {
    setIsVisible(false)
    onClose()
  }, duration)

  const bgColor = type === 'success' ? 'bg-green-50 border-green-200' : type === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'
  const textColor = type === 'success' ? 'text-green-900' : type === 'error' ? 'text-red-900' : 'text-blue-900'
  const Icon = type === 'success' ? CheckCircle : AlertCircle
  const iconColor = type === 'success' ? 'text-green-500' : type === 'error' ? 'text-red-500' : 'text-blue-500'

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed top-4 right-4 border-2 rounded-lg p-4 flex items-center gap-3 shadow-lg ${bgColor} ${textColor}`}
        >
          <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
          <p className="font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
