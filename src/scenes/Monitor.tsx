import { useRef } from 'react'
import type { Group } from 'three'
import { ProjectMedia } from '@/components/ProjectMedia'
import { ScreenOverlay } from '@/components/ScreenOverlay'
import { projects } from '@/data/projectsData'
import { Box, palette } from './Furniture'
import styles from '@/components/Projects.module.css'

export type MonitorControls = {
  selected: number
  playing: boolean
  onOpen: () => void
  onSelect: (index: number) => void
  onPlay: () => void
  onStop: () => void
}

export function Monitor({ selected, playing, onOpen, onSelect, onPlay, onStop }: MonitorControls) {
  const housing = useRef<Group>(null!)
  const project = projects[selected]

  return (
    <group position={[0.34, 1.6, -1.26]}>
      <group ref={housing}>
        <Box size={[2.02, 1.17, 0.13]} position={[0, 0.88, 0]} color={palette.ink} />
        <Box size={[0.12, 0.49, 0.12]} position={[0, 0.25, -0.1]} color={palette.ink} metalness={0.3} />
        <Box size={[0.61, 0.07, 0.36]} position={[0, 0.039, -0.08]} color={palette.ink} metalness={0.3} />
      </group>
      <ScreenOverlay
        position={[0, 0.88, 0.078]}
        occluders={[housing]}
        onVisibilityChange={(visible) => { if (!visible && playing) onStop() }}
      >
        <div className={styles.screen}>
          <div className={styles.screenHeader}>
            <button type="button" className={styles.screenTitle} onClick={onOpen} aria-label="Abrir proyectos en el monitor">Proyectos ↗</button>
            {projects.length > 1 && (
              <select aria-label="Proyecto del monitor" value={selected} onChange={(event) => onSelect(Number(event.target.value))}>
                {projects.map((item, index) => <option value={index} key={item.id}>{item.title}</option>)}
              </select>
            )}
          </div>
          <ProjectMedia key={project.id} project={project} playing={playing} onPlay={onPlay} onStop={onStop} compact />
        </div>
      </ScreenOverlay>
    </group>
  )
}
