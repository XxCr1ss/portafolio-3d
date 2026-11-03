import { Panel } from '@/components/Panel'
import { ProjectMedia } from '@/components/ProjectMedia'
import { projects } from '@/data/projectsData'
import styles from './Projects.module.css'

type Props = {
  selected: number
  playing: boolean
  onSelect: (index: number) => void
  onPlay: () => void
  onStop: () => void
  onClose: () => void
}

export function ProjectsPanel({ selected, playing, onSelect, onPlay, onStop, onClose }: Props) {
  const project = projects[selected]

  return (
    <Panel eyebrow="01 / Monitor" title="Proyectos" onClose={onClose}>
      <div className={styles.body}>
        {projects.length > 1 && (
          <label className={styles.selector}>
            Proyecto
            <select value={selected} onChange={(event) => onSelect(Number(event.target.value))}>
              {projects.map((item, index) => <option value={index} key={item.id}>{item.title}</option>)}
            </select>
          </label>
        )}
        <ProjectMedia key={project.id} project={project} playing={playing} onPlay={onPlay} onStop={onStop} />
        <div className={styles.detail}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ul className={styles.tags} aria-label="Tecnologías">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className={styles.links}>
            {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">Ver demo ↗</a>}
            {project.codeUrl && <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">Ver código en GitHub ↗</a>}
          </div>
        </div>
      </div>
    </Panel>
  )
}
