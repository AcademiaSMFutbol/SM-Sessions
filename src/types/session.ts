export type SessionObjective = 'tecnico' | 'tactico' | 'fisico' | 'mixto'
export type PhaseId = 'warmup' | 'main' | 'cooldown'
export type Intensity = 'baja' | 'media' | 'alta'

export interface Task {
  id: string
  order: number
  name: string
  duration: number
  description: string
  players: number
  space: string
  materials: string[]
  objectives: string[]
  intensity: Intensity
  coachNotes: string
}

export interface Phase {
  id: PhaseId
  name: string
  duration: number
  tasks: Task[]
}

export interface SessionMeta {
  id: string
  version: string
  createdAt: string
  updatedAt: string
  club: string
  coach: string
  date: string
  category: string
  totalDuration: number
  players: number
  objective: SessionObjective
  theme: string
  notes: string
}

export interface Session {
  meta: SessionMeta
  phases: Phase[]
}
