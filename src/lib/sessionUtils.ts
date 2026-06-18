import { Session } from '@/types/session'

export function computeTotalDuration(session: Session): number {
  return session.phases.reduce((acc, phase) => acc + phase.duration, 0)
}

export function computePhaseDuration(session: Session, phaseId: string): number {
  const phase = session.phases.find(p => p.id === phaseId)
  if (!phase) return 0
  return phase.tasks.reduce((acc, task) => acc + task.duration, 0)
}

export function buildExportJson(session: Session): object {
  const updatedSession = {
    ...session,
    meta: { ...session.meta, updatedAt: new Date().toISOString() },
  }

  return {
    smSessions: {
      schema: 'sm-sessions-v1',
      exportedAt: new Date().toISOString(),
      session: updatedSession,
    },
  }
}

export function downloadJson(session: Session) {
  const data = buildExportJson(session)
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = session.meta.date || new Date().toISOString().split('T')[0]
  const theme = session.meta.theme ? `-${session.meta.theme.replace(/\s+/g, '_')}` : ''
  a.href = url
  a.download = `sesion-${date}${theme}.json`
  a.click()
  URL.revokeObjectURL(url)
}
