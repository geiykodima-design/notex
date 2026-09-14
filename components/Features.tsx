'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, BarChart3, MessageCircle } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Конспект',
    description: 'ШІ витягує головне з твого матеріалу й структурує його красиво',
  },
  {
    icon: Lightbulb,
    title: 'Картки',
    description: 'Автоматично згенеровані флеш-картки для повторення',
  },
  {
    icon: BarChart3,
    title: 'Тест',
    description: 'Проходь тест з поясненнями помилок',
  },
  {
    icon: MessageCircle,
    title: 'Репетитор',
    description: 'Чат з ШІ-репетитором, що знає твій матеріал',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">Як це працює</h2>
          <p className="text-xl text-neutral-600">Від завантаження до навчання — все в одному місці</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="card-container"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
