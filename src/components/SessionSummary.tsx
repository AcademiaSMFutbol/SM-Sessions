'use client'

import { Session } from '@/types/session'
import { OBJECTIVES } from '@/lib/defaults'

interface Props {
  session: Session
}

export default function SessionSummary({ session }: Props) {
  const { meta, phases } = session
  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0)
  const totalMin = phases.reduce((acc, p) => acc + p.tasks.reduce((a, t) => a + t.duration, 0), 0)
  const obj = OBJECTIVES.find(o => o.value === meta.objective)

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3 flex flex-wrap items-center gap-4 text-sm">
      {meta.club && (
        <span className="text-slate-300 font-medium">{meta.club}</span>
      )}
      {meta.category && (
        <span className="px-2 py-0.5 bg-slate-700 rounded text-slate-300 text-xs">{meta.category}</span>
      )}
      {obj && (
        <span className={`px-2 py-0.5 rounded text-white text-xs ${obj.color}`}>{obj.label}</span>
      )}
      {meta.theme && (
        <span className="text-slate-400 italic">"{meta.theme}"</span>
      )}
      <div className="ml-auto flex items-center gap-4 text-slate-400 text-xs">
        <span>👤 {meta.players} jugadores</span>
        <span>⏱ {meta.totalDuration} min planificados</span>
        <span>⚽ {totalTasks} ejercicio{totalTasks !== 1 ? 's' : ''}</span>
        <span className={totalMin > meta.totalDuration ? 'text-red-400' : 'text-green-400'}>
          {totalMin} min asignados
        </span>
      </div>
    </div>
  )
}
