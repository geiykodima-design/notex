'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedGradient from '@/components/svg/AnimatedGradient'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-subtle overflow-hidden pt-20 pb-20">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left content */}
          <div>
            <motion.div variants={itemVariants}>
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-6">
                <p className="text-sm font-semibold text-blue-600">Новий спосіб навчатися</p>
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Вчися краще з <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">ШІ</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Завантаж свою лекцію, підручник або конспект — отримай структурований матеріал, картки для повторення, тест для само��еревірки та особистого репетитора. Все автоматично.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Почати безплатно
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-200 text-neutral-900 font-semibold rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                Як це працює
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-neutral-900">3</p>
                <p className="text-sm text-neutral-600">вільні конспекти/місяць</p>
              </div>
              <div className="w-px h-12 bg-slate-200" />
              <div>
                <p className="text-2xl font-bold text-neutral-900">100%</p>
                <p className="text-sm text-neutral-600">твої дані у безпеці</p>
              </div>
            </motion.div>
          </div>

          {/* Right illustration */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="w-full max-w-md">
              <AnimatedGradient />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
