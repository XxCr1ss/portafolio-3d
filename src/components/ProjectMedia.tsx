import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/data/projectsData'
import styles from './Projects.module.css'

type Props = {
  project: Project
  playing: boolean
  onPlay: () => void
  onStop: () => void
  compact?: boolean
}

export function ProjectMedia({ project, playing, onPlay, onStop, compact = false }: Props) {
  const player = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = player.current
    if (!playing || !video) return
    let active = true
    void video.play().catch(() => {
      if (active) setFailed(true)
    })
    return () => {
      active = false
      video.pause()
    }
  }, [playing])

  return (
    <div className={compact ? styles.compactMedia : styles.media}>
      {playing && project.video && !failed ? (
        <>
          <video
            ref={player}
            src={project.video}
            poster={project.poster}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`Demostración de ${project.title}`}
            onError={() => setFailed(true)}
          />
          <button type="button" className={styles.mediaButton} onClick={onStop}>
            <span aria-hidden="true">■</span> {compact ? 'Detener' : 'Detener video'}
          </button>
        </>
      ) : (
        <>
          <img src={project.poster} alt={`Vista del proyecto ${project.title}`} width="720" height="405" />
          {failed ? (
            <p className={styles.mediaError} role="status">Video no disponible.</p>
          ) : project.video && (
            <button type="button" className={styles.mediaButton} onClick={onPlay}>
              <span aria-hidden="true">▶</span> {compact ? 'Video' : 'Reproducir demo'}
            </button>
          )}
        </>
      )}
    </div>
  )
}
