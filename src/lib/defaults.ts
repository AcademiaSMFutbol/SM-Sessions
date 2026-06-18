import { Phase, Session, SessionObjective } from '@/types/session'

export const CATEGORIES = [
  'Prebenjamín (5-6 años)',
  'Benjamín (7-8 años)',
  'Alevín (9-10 años)',
  'Infantil (11-12 años)',
  'Cadete (13-14 años)',
  'Juvenil (15-17 años)',
  'Junior (18-19 años)',
  'Senior',
  'Veteranos',
]

export const OBJECTIVES: { value: SessionObjective; label: string; color: string }[] = [
  { value: 'tecnico', label: 'Técnico', color: 'bg-blue-500' },
  { value: 'tactico', label: 'Táctico', color: 'bg-purple-500' },
  { value: 'fisico', label: 'Físico', color: 'bg-orange-500' },
  { value: 'mixto', label: 'Mixto', color: 'bg-green-500' },
]

export const COMMON_MATERIALS = [
  'Balones', 'Conos', 'Picas', 'Chalecos', 'Porterías', 'Escalera coordinación',
  'Vallas', 'Discos', 'Petos', 'Redes', 'Aros', 'Banderines',
]

export const COMMON_OBJECTIVES_LIST = [
  'Control', 'Pase', 'Conducción', 'Tiro', 'Regate', 'Pressing',
  'Transición ataque', 'Transición defensa', 'Juego posicional', 'Finalización',
  'Coordinación', 'Velocidad', 'Resistencia', 'Fuerza', 'Flexibilidad',
  'Juego aéreo', 'Marcaje', 'Desmarque', 'Comunicación', 'Concentración',
]

export const PHASE_CONFIG: Record<string, { label: string; color: string; border: string; icon: string }> = {
  warmup: { label: 'Calentamiento', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/40', icon: '🔥' },
  main: { label: 'Parte Principal', color: 'from-green-500/20 to-green-600/10', border: 'border-green-500/40', icon: '⚽' },
  cooldown: { label: 'Vuelta a la Calma', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/40', icon: '🧊' },
}

export function createDefaultSession(): Session {
  const now = new Date().toISOString()
  return {
    meta: {
      id: crypto.randomUUID(),
      version: '1.0',
      createdAt: now,
      updatedAt: now,
      club: '',
      coach: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Alevín (9-10 años)',
      totalDuration: 90,
      players: 16,
      objective: 'mixto',
      theme: '',
      notes: '',
    },
    phases: [
      { id: 'warmup', name: 'Calentamiento', duration: 15, tasks: [] },
      { id: 'main', name: 'Parte Principal', duration: 60, tasks: [] },
      { id: 'cooldown', name: 'Vuelta a la Calma', duration: 15, tasks: [] },
    ],
  }
}

export function createDefaultTask(order: number, players: number) {
  return {
    id: crypto.randomUUID(),
    order,
    name: '',
    duration: 10,
    description: '',
    players,
    space: '',
    materials: [],
    objectives: [],
    intensity: 'media' as const,
    coachNotes: '',
  }
}
