'use client'

import { Session } from '@/types/session'
import { buildExportJson, downloadJson } from '@/lib/sessionUtils'
import { useState } from 'react'

interface Props {
  session: Session
}

export default function JsonPanel({ session }: Props) {
  const [copied, setCopied] = useState(false)
  const json = JSON.stringify(buildExportJson(session), null, 2)

  const copy = async () => {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <span className="text-green-400 font-mono text-xs">{`{}`}</span> JSON Export
        </h2>
        <div className="flex gap-2">
          <button
            onClick={copy}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              copied
                ? 'bg-green-600 border-green-500 text-white'
                : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-500'
            }`}
          >
            {copied ? '✓ Copiado' : 'Copiar'}
          </button>
          <button
            onClick={() => downloadJson(session)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-600 hover:bg-green-500 text-white border border-green-500 transition-all"
          >
            ↓ Descargar .json
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <pre className="text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap break-all">
          {json}
        </pre>
      </div>
    </div>
  )
}
