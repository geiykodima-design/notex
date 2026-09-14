import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Notex — Вчися краще з ШІ',
  description: 'Генеруй конспекти, картки, тести з твоїх матеріалів',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className="bg-white text-neutral-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
