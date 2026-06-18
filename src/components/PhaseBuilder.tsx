'use client'

import { Phase, Task } from '@/types/session'
import { PHASE_CONFIG, createDefaultTask } from '@/lib/defaults'
import TaskForm from './TaskForm'

interface Props {
  phase: Phase
  defaultPlayers: number
  onChange: (phase: Phase) => void
}

export default function PhaseBuilder({ phase, defaultPlayers, onChange }: Props) {
  const cfg = PHASE_CONFIG[phase.id]

  const addTask = () => {
    const newTask = createDefaultTask(phase.tasks.length + 1, defaultPlayers)
    onChange({ ...phase, tasks: [...phase.tasks, newTask] })
  }

  const updateTask = (index: number, task: Task) => {
    const tasks = phase.tasks.map((t, i) => (i === index ? task : t))
    onChange({ ...phase, tasks })
  }

  const deleteTask = (index: number) => {
    const tasks = phase.tasks
      .filter((_, i) => i !== index)
      .map((t, i) => ({ ...t, order: i + 1 }))
    onChange({ ...phase, tasks })
  }

  const moveTask = (index: number, direction: 'up' | 'down') => {
    const tasks = [...phase.tasks]
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= tasks.length) return
    ;[tasks[index], tasks[target]] = [tasks[target], tasks[index]]
    const reordered = tasks.map((t, i) => ({ ...t, order: i + 1 }))
    onChange({ ...phase, tasks: reordered })
  }

  const totalMinutes = phase.tasks.reduce((acc, t) => acc + t.duration, 0)

  return (
    <div className={`rounded-xl border bg-gradient-to-br ${cfg.color} ${cfg.border} p-5 space-y-4`}>
      {/* Phase header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{cfg.icon}</span>
          <div>
            <h3 className="text-white font-semibold text-base">{cfg.label}</h3>
            <p className="text-slate-400 text-xs">
              {phase.tasks.length} ejercicio{phase.tasks.length !== 1 ? 's' : ''} · {totalMinutes} min
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Duración bloque:</label>
          <input
            type="number"
            min={0}
            max={120}
            step={5}
            value={phase.duration}
            onChange={e => onChange({ ...phase, duration: parseInt(e.target.value) || 0 })}
            className="w-16 bg-slate-700/80 border border-slate-600 rounded px-2 py-1 text-sm text-center text-white"
          />
          <span className="text-xs text-slate-400">min</span>
        </div>
      </div>

      {/* Tasks */}
      {phase.tasks.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-sm border border-dashed border-slate-700 rounded-lg">
          Sin ejercicios aún. Añade el primero.
        </div>
      )}

      <div className="space-y-3">
        {phase.tasks.map((task, index) => (
          <TaskForm
            key={task.id}
            task={task}
            onChange={updated => updateTask(index, updated)}
            onDelete={() => deleteTask(index)}
            onMoveUp={() => moveTask(index, 'up')}
            onMoveDown={() => moveTask(index, 'down')}
            isFirst={index === 0}
            isLast={index === phase.tasks.length - 1}
          />
        ))}
      </div>

      <button
        onClick={addTask}
        className="w-full py-2.5 border border-dashed border-slate-600 text-slate-400 hover:border-green-500 hover:text-green-400 rounded-lg text-sm transition-all"
      >
        + Añadir ejercicio
      </button>
    </div>
  )
}
