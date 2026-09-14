'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-12 border border-blue-200 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Готов вчитися краще?
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Перші 3 конспекти – повністю безплатно. Без карти, без прихованих платежів.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Почати безплатно
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-300 text-neutral-900 font-semibold rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            >
              Вже маю акаунт
            </Link>
          </div>

          <p className="text-sm text-neutral-500 mt-8">
            Без карти потрібна, без завдань на запрошення, без спаму
          </p>
        </div>
      </motion.div>
    </section>
  )
}
