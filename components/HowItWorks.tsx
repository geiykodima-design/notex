'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SparkleIcon from '@/components/svg/SparkleIcon'

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Завантаж матеріал',
      description: 'PDF, DOCX або просто вставь текст лекції',
    },
    {
      number: '2',
      title: 'ШІ аналізує',
      description: 'За кілька секунд генерується структурований конспект',
    },
    {
      number: '3',
      title: 'Отримай всі інструменти',
      description: 'Картки, тест, чат з репетитором – все готово',
    },
    {
      number: '4',
      title: 'Навчайся ефективно',
      description: 'Повтори, перевір себе, задай питання репетитору',
    },
  ]

  return (
    <section className="py-24 px-4 bg-gradient-subtle relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">4 кроки до успіху</h2>
          <p className="text-xl text-neutral-600">Простий процес, що змінює результати</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 border border-slate-200 h-full hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="w-6 h-6 text-blue-400 opacity-0 md:opacity-100">
                    <SparkleIcon />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
                <p className="text-neutral-600">{step.description}</p>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-300 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
