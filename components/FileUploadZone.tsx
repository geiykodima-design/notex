'use client'

import { motion } from 'framer-motion'
import { Upload, FileText } from 'lucide-react'
import { useState, useRef } from 'react'

interface FileUploadZoneProps {
  onFileUpload: (file: File) => Promise<void>
  uploading: boolean
}

export default function FileUploadZone({ onFileUpload, uploading }: FileUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      handleFile(files[0])
    }
  }

  const handleFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Підтримуються тільки PDF, DOCX та TXT файли')
      return
    }

    if (file.size > maxSize) {
      alert('Максимальний розмір файлу – 10 МБ')
      return
    }

    onFileUpload(file)
  }

  return (
    <motion.div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      whileHover={{ borderColor: '#3B82F6' }}
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center cursor-pointer ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white hover:bg-blue-50'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={false}
        onChange={handleChange}
        accept=".pdf,.docx,.txt"
        className="hidden"
      />

      <motion.div
        animate={{ y: dragActive ? -5 : 0 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
          <Upload size={32} className="text-white" />
        </div>

        <h3 className="text-xl font-bold text-neutral-900 mb-2">Залий матеріал</h3>
        <p className="text-neutral-600 mb-4">
          PDF, DOCX або текст (до 10 МБ)
        </p>

        {uploading && (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Завантаження...</span>
          </div>
        )}

        {!uploading && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <FileText size={18} />
            Вибрати файл
          </button>
        )}
      </motion.div>
    </motion.div>
  )
}
