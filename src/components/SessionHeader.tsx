'use client'

import { SessionMeta, SessionObjective } from '@/types/session'
import { CATEGORIES, OBJECTIVES } from '@/lib/defaults'

interface Props {
  meta: SessionMeta
  onChange: (meta: SessionMeta) => void
}

export default function SessionHeader({ meta, onChange }: Props) {
  const set = (field: keyof SessionMeta, value: string | number) =>
    onChange({ ...meta, [field]: value })

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-white flex items-center gap-2">
        <span className="text-green-400">📋</span> Datos de la Sesión
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Field label="Club / Academia">
          <input
            type="text"
            placeholder="Ej: Academia SM Fútbol"
            value={meta.club}
            onChange={e => set('club', e.target.value)}
            className="input-field"
          />
        </Field>

        <Field label="Entrenador">
          <input
            type="text"
            placeholder="Nombre del entrenador"
            value={meta.coach}
            onChange={e => set('coach', e.target.value)}
            className="input-field"
          />
        </Field>

        <Field label="Fecha">
          <input
            type="date"
            value={meta.date}
            onChange={e => set('date', e.target.value)}
            className="input-field"
          />
        </Field>

        <Field label="Categoría">
          <select
            value={meta.category}
            onChange={e => set('category', e.target.value)}
            className="input-field"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </Field>

        <Field label="Jugadores">
          <input
            type="number"
            min={1}
            max={40}
            value={meta.players}
            onChange={e => set('players', parseInt(e.target.value) || 1)}
            className="input-field"
          />
        </Field>

        <Field label="Duración total (min)">
          <input
            type="number"
            min={15}
            max={180}
            step={5}
            value={meta.totalDuration}
            onChange={e => set('totalDuration', parseInt(e.target.value) || 60)}
            className="input-field"
          />
        </Field>

        <Field label="Tema / Enfoque" className="md:col-span-2">
          <input
            type="text"
            placeholder="Ej: Control orientado y pase en espacio reducido"
            value={meta.theme}
            onChange={e => set('theme', e.target.value)}
            className="input-field"
          />
        </Field>

        <Field label="Objetivo principal">
          <div className="flex gap-2 flex-wrap">
            {OBJECTIVES.map(obj => (
              <button
                key={obj.value}
                onClick={() => set('objective', obj.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                  meta.objective === obj.value
                    ? `${obj.color} text-white border-transparent`
                    : 'bg-slate-700 text-slate-300 border-slate-600 hover:border-slate-500'
                }`}
              >
                {obj.label}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <Field label="Notas generales">
        <textarea
          rows={2}
          placeholder="Observaciones, condiciones del campo, material especial..."
          value={meta.notes}
          onChange={e => set('notes', e.target.value)}
          className="input-field resize-none"
        />
      </Field>
    </div>
  )
}

function Field({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  )
}
