'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

interface SkeletonProps {
  count?: number
  height?: string
  width?: string
}

export function SkeletonLoader({ count = 3, height = 'h-8', width = 'w-full' }: SkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`${width} ${height} bg-slate-200 rounded-lg`}
        />
      ))}
    </div>
  )
}

export function SummaryPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-12 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-6 w-full bg-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default function OptimizationTip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3"
    >
      <Zap className="w-5 h-5 text-blue-600 flex-shrink-0" />
      <div>
        <p className="font-semibold text-blue-900 text-sm">Порада</p>
        <p className="text-blue-800 text-sm">Зберіж конспект у PDF для офлайн-доступу та поділись з однокласниками</p>
      </div>
    </motion.div>
  )
}
