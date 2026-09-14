'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl sm:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
          Вчися краще з <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">ШІ</span>
        </h1>
        <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
          Завантаж свою лекцію, підручник або конспект — і отримай структурований матеріал, картки, тести та особистого репетитора
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup" className="btn-primary">
            Почати безплатно
          </Link>
          <Link href="#features" className="btn-secondary">
            Дізнатись більше
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
