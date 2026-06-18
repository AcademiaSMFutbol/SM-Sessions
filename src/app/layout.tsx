import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PwaProvider from '@/components/PwaProvider'

const inter = Inter({ subsets: ['latin'] })

const base = process.env.NODE_ENV === 'production' ? '/SM-Sessions' : ''

export const metadata: Metadata = {
  title: 'SM Sessions — Generador de Sesiones de Fútbol',
  description: 'Diseña y exporta sesiones de entrenamiento de fútbol en formato JSON',
  manifest: `${base}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SM Sessions',
  },
}

export const viewport: Viewport = {
  themeColor: '#16a34a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-full`}>
        <PwaProvider />
        {children}
      </body>
    </html>
  )
}
