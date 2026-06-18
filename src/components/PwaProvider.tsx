'use client'

import { useEffect } from 'react'

export default function PwaProvider() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
      navigator.serviceWorker
        .register(`${base}/sw.js`, { scope: base ? `${base}/` : '/' })
        .catch(() => {})
    }
  }, [])
  return null
}
