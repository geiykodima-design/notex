'use client'

import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Features />
      <CTA />
    </main>
  )
}
