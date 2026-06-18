import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SM Sessions — Generador de Sesiones de Fútbol',
  description: 'Diseña y exporta sesiones de entrenamiento de fútbol en formato JSON',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-full`}>{children}</body>
    </html>
  )
}
