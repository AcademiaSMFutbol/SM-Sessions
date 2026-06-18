'use client'

import { useState, useCallback } from 'react'
import { Session, Phase } from '@/types/session'
import { createDefaultSession } from '@/lib/defaults'
import SessionHeader from '@/components/SessionHeader'
import PhaseBuilder from '@/components/PhaseBuilder'
import JsonPanel from '@/components/JsonPanel'
import SessionSummary from '@/components/SessionSummary'
import { downloadJson } from '@/lib/sessionUtils'

export default function Home() {
  const [session, setSession] = useState<Session>(createDefaultSession)
  const [showJson, setShowJson] = useState(false)

  const updateMeta = useCallback(
    (meta: Session['meta']) => setSession(s => ({ ...s, meta })),
    []
  )

  const updatePhase = useCallback((phaseId: string, phase: Phase) => {
    setSession(s => ({
      ...s,
      phases: s.phases.map(p => (p.id === phaseId ? phase : p)),
    }))
  }, [])

  const resetSession = () => {
    if (confirm('¿Seguro que quieres empezar una sesión nueva? Se perderán los datos actuales.')) {
      setSession(createDefaultSession())
    }
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top nav */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-sm">
              SM
            </div>
            <div>
              <h1 className="text-white font-bold text-sm leading-none">SM Sessions</h1>
              <p className="text-slate-500 text-xs leading-none mt-0.5">Generador de sesiones</p>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button onClick={resetSession} className="btn-secondary text-xs px-3 py-1.5">
              Nueva sesión
            </button>
            <button
              onClick={() => setShowJson(!showJson)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                showJson
                  ? 'bg-green-600 border-green-500 text-white'
                  : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-slate-500'
              }`}
            >
              {showJson ? '← Ocultar JSON' : 'Ver JSON →'}
            </button>
            <button
              onClick={() => downloadJson(session)}
              className="btn-primary text-xs px-3 py-1.5"
            >
              ↓ Exportar .json
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className={`flex gap-6 ${showJson ? 'flex-col lg:flex-row' : 'flex-col'}`}>
          {/* Editor column */}
          <div className={`space-y-5 ${showJson ? 'lg:flex-1 min-w-0' : 'w-full'}`}>
            <SessionHeader meta={session.meta} onChange={updateMeta} />

            <SessionSummary session={session} />

            {session.phases.map(phase => (
              <PhaseBuilder
                key={phase.id}
                phase={phase}
                defaultPlayers={session.meta.players}
                onChange={updated => updatePhase(phase.id, updated)}
              />
            ))}
          </div>

          {/* JSON panel */}
          {showJson && (
            <div className="lg:w-[480px] shrink-0">
              <div className="sticky top-20 max-h-[calc(100vh-6rem)] flex flex-col">
                <JsonPanel session={session} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
