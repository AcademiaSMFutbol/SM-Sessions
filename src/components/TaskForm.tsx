'use client'

import { Task, Intensity } from '@/types/session'
import { COMMON_MATERIALS, COMMON_OBJECTIVES_LIST } from '@/lib/defaults'
import { useState } from 'react'

interface Props {
  task: Task
  onChange: (task: Task) => void
  onDelete: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  isFirst?: boolean
  isLast?: boolean
}

const INTENSITY_OPTIONS: { value: Intensity; label: string; color: string }[] = [
  { value: 'baja', label: 'Baja', color: 'bg-blue-500/80' },
  { value: 'media', label: 'Media', color: 'bg-amber-500/80' },
  { value: 'alta', label: 'Alta', color: 'bg-red-500/80' },
]

export default function TaskForm({ task, onChange, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: Props) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [matInput, setMatInput] = useState('')
  const [objInput, setObjInput] = useState('')

  const set = <K extends keyof Task>(field: K, value: Task[K]) =>
    onChange({ ...task, [field]: value })

  const toggleMaterial = (mat: string) => {
    const list = task.materials.includes(mat)
      ? task.materials.filter(m => m !== mat)
      : [...task.materials, mat]
    set('materials', list)
  }

  const addCustomMaterial = () => {
    const v = matInput.trim()
    if (v && !task.materials.includes(v)) set('materials', [...task.materials, v])
    setMatInput('')
  }

  const toggleObjective = (obj: string) => {
    const list = task.objectives.includes(obj)
      ? task.objectives.filter(o => o !== obj)
      : [...task.objectives, obj]
    set('objectives', list)
  }

  const addCustomObjective = () => {
    const v = objInput.trim()
    if (v && !task.objectives.includes(v)) set('objectives', [...task.objectives, v])
    setObjInput('')
  }

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-lg overflow-hidden">
      {/* Task header */}
      <div className="flex items-center gap-3 p-3 bg-slate-800">
        <div className="flex flex-col gap-0.5">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className="text-slate-500 hover:text-slate-300 disabled:opacity-20 disabled:cursor-not-allowed leading-none text-xs"
          >▲</button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className="text-slate-500 hover:text-slate-300 disabled:opacity-20 disabled:cursor-not-allowed leading-none text-xs"
          >▼</button>
        </div>

        <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-400 text-xs flex items-center justify-center font-bold shrink-0">
          {task.order}
        </span>

        <input
          type="text"
          placeholder="Nombre del ejercicio..."
          value={task.name}
          onChange={e => set('name', e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm font-medium outline-none"
        />

        <div className="flex items-center gap-2 shrink-0">
          <input
            type="number"
            min={1}
            max={90}
            value={task.duration}
            onChange={e => set('duration', parseInt(e.target.value) || 1)}
            className="w-14 bg-slate-700 border border-slate-600 rounded px-2 py-1 text-sm text-center text-white"
          />
          <span className="text-xs text-slate-400">min</span>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white transition-colors px-2"
          >
            {isExpanded ? '▲' : '▼'}
          </button>

          <button
            onClick={onDelete}
            className="text-slate-500 hover:text-red-400 transition-colors text-lg leading-none"
            title="Eliminar tarea"
          >×</button>
        </div>
      </div>

      {/* Expanded body */}
      {isExpanded && (
        <div className="p-4 space-y-4 border-t border-slate-700/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="field-label">Descripción del ejercicio</label>
              <textarea
                rows={3}
                placeholder="Describe el ejercicio, organización, variantes..."
                value={task.description}
                onChange={e => set('description', e.target.value)}
                className="input-field resize-none text-sm"
              />
            </div>

            <div>
              <label className="field-label">Espacio (dimensiones)</label>
              <input
                type="text"
                placeholder="Ej: 20x20m, Medio campo..."
                value={task.space}
                onChange={e => set('space', e.target.value)}
                className="input-field text-sm"
              />
            </div>

            <div>
              <label className="field-label">Jugadores en el ejercicio</label>
              <input
                type="number"
                min={1}
                max={40}
                value={task.players}
                onChange={e => set('players', parseInt(e.target.value) || 1)}
                className="input-field text-sm"
              />
            </div>
          </div>

          {/* Intensity */}
          <div>
            <label className="field-label">Intensidad</label>
            <div className="flex gap-2">
              {INTENSITY_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => set('intensity', opt.value)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                    task.intensity === opt.value
                      ? `${opt.color} text-white border-transparent`
                      : 'bg-slate-700 text-slate-400 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <label className="field-label">Material necesario</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_MATERIALS.map(mat => (
                <button
                  key={mat}
                  onClick={() => toggleMaterial(mat)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-all border ${
                    task.materials.includes(mat)
                      ? 'bg-green-600 text-white border-green-500'
                      : 'bg-slate-700 text-slate-400 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Otro material..."
                value={matInput}
                onChange={e => setMatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomMaterial()}
                className="input-field text-sm flex-1"
              />
              <button onClick={addCustomMaterial} className="btn-secondary text-sm px-3">+</button>
            </div>
            {task.materials.filter(m => !COMMON_MATERIALS.includes(m)).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {task.materials.filter(m => !COMMON_MATERIALS.includes(m)).map(m => (
                  <span key={m} className="px-2.5 py-1 rounded-md text-xs bg-green-600 text-white border border-green-500 flex items-center gap-1">
                    {m}
                    <button onClick={() => toggleMaterial(m)} className="hover:text-red-200">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Objectives */}
          <div>
            <label className="field-label">Objetivos del ejercicio</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_OBJECTIVES_LIST.map(obj => (
                <button
                  key={obj}
                  onClick={() => toggleObjective(obj)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-all border ${
                    task.objectives.includes(obj)
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-700 text-slate-400 border-slate-600 hover:border-slate-500'
                  }`}
                >
                  {obj}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Otro objetivo..."
                value={objInput}
                onChange={e => setObjInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomObjective()}
                className="input-field text-sm flex-1"
              />
              <button onClick={addCustomObjective} className="btn-secondary text-sm px-3">+</button>
            </div>
            {task.objectives.filter(o => !COMMON_OBJECTIVES_LIST.includes(o)).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {task.objectives.filter(o => !COMMON_OBJECTIVES_LIST.includes(o)).map(o => (
                  <span key={o} className="px-2.5 py-1 rounded-md text-xs bg-purple-600 text-white border border-purple-500 flex items-center gap-1">
                    {o}
                    <button onClick={() => toggleObjective(o)} className="hover:text-red-200">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Coach notes */}
          <div>
            <label className="field-label">Notas del entrenador</label>
            <input
              type="text"
              placeholder="Correcciones clave, puntos de atención..."
              value={task.coachNotes}
              onChange={e => set('coachNotes', e.target.value)}
              className="input-field text-sm"
            />
          </div>
        </div>
      )}
    </div>
  )
}
