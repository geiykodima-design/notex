'use client'

import { motion } from 'framer-motion'
import DocumentIcon from '@/components/svg/DocumentIcon'
import BrainIcon from '@/components/svg/BrainIcon'
import CheckmarkIcon from '@/components/svg/CheckmarkIcon'
import QuizIcon from '@/components/svg/QuizIcon'

const features = [
  {
    icon: DocumentIcon,
    title: 'Конспект',
    description: 'ШІ видобуває головне з твого матеріалу й структурує його зрозумілою мовою',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: BrainIcon,
    title: 'Картки',
    description: 'Автоматичні флеш-картки для ефективного повторення ключових понять',
    gradient: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: QuizIcon,
    title: 'Тест',
    description: 'Перевір себе – тест з поясненнями помилок прямо з твого матеріалу',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    icon: CheckmarkIcon,
    title: 'Репетитор',
    description: 'Чат з ШІ, яка знає твій матеріал і готова відповідати на питання',
    gradient: 'from-emerald-500 to-emerald-600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Features() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">Як це працює</h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Чотири потужні інструменти, що працюють разом, щоб зробити навчання ефективнішим
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-gradient-card rounded-2xl p-8 h-full border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Icon container */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 opacity-90`}>
                    <div className="text-white">
                      <Icon />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{feature.description}</p>

                  {/* Decorative line */}
                  <div className="mt-6 h-1 w-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
