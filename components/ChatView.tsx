'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

interface ChatViewProps {
  summaryId: string
  initialMessage: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatView({ summaryId, initialMessage }: ChatViewProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialMessage },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ summaryId, message: userMessage }),
      })

      if (!response.ok) throw new Error('Failed to send message')
      const { message: assistantMessage } = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }])
    } catch (err) {
      console.error('Error:', err)
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Помилка при отриманні відповіді. Спробуй ще раз.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto flex flex-col h-[600px] bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden"
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-6 py-3 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                  : 'bg-slate-100 text-neutral-900'
              }`}
            >
              <p className="leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 text-neutral-900 px-6 py-3 rounded-2xl">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 p-4 bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Запитай що-небудь..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
