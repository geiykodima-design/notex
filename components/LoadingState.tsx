'use client'

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mx-auto mb-4 animate-pulse" />
        </div>
        <p className="text-neutral-600 font-medium">Завантажуємо...</p>
      </div>
    </div>
  )
}
