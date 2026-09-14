'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-neutral-900 mb-6">
          Готов почати?
        </h2>
        <p className="text-lg text-neutral-600 mb-8">
          Перші 3 конспекти — безплатно. Після того вибери що тобі підходить.
        </p>
        <Link href="/auth/signup" className="btn-primary inline-block">
          Реєстрація за 30 секунд
        </Link>
      </motion.div>
    </section>
  )
}
