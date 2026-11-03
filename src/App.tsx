import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { ProjectsPanel } from '@/components/ProjectsPanel'
import { SceneBoundary } from '@/components/SceneBoundary'
import styles from './App.module.css'

const Studio = lazy(() => import('@/scenes/Studio'))

export default function App() {
  const [scene, setScene] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [reset, setReset] = useState(0)
  const [panelOpen, setPanelOpen] = useState(false)
  const [selected, setSelected] = useState(0)
  const [playback, setPlayback] = useState<'monitor' | 'panel' | null>(null)
  const projectsButton = useRef<HTMLButtonElement>(null)
  const sceneReady = useCallback(() => setScene('ready'), [])
  const sceneFailed = useCallback(() => setScene('failed'), [])

  const openProjects = () => {
    setPlayback(null)
    setPanelOpen(true)
  }

  const closeProjects = () => {
    setPlayback(null)
    setPanelOpen(false)
    requestAnimationFrame(() => projectsButton.current?.focus())
  }

  const selectProject = (index: number) => {
    setPlayback(null)
    setSelected(index)
  }

  const stopPlayback = () => setPlayback(null)

  const resetView = () => setReset((value) => value + 1)

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <a className={styles.brand} href="/" aria-label="Cristian Cabrera, página de inicio">
          <img src="/studio.svg" width="38" height="38" alt="" />
          <span>Cristian Cabrera <small>Portafolio 3D</small></span>
        </a>
        <nav className={styles.nav} aria-label="Navegación principal">
          <button type="button" onClick={resetView} className={styles.navCurrent}>Inicio <span>(Taller)</span></button>
          <button ref={projectsButton} type="button" onClick={openProjects}>Proyectos <span>(Monitor)</span></button>
        </nav>
        <span className={styles.issue}>Edición 01 / 2026</span>
      </header>

      <main className={styles.layout}>
        <section className={styles.intro} aria-labelledby="main-title">
          <p className={styles.kicker}><span className={styles.dot} /> Portafolio interactivo</p>
          <h1 id="main-title">Taller{' '}<em>isométrico.</em></h1>
          <p className={styles.introCopy}>Soy Cristian Cabrera. Este es mi espacio de trabajo digital para explorar diseño, código y experiencias web en 3D.</p>
          <div className={styles.actions}>
            <button type="button" onClick={openProjects} className={styles.primary}>Explorar proyectos <span aria-hidden="true">↗</span></button>
          </div>
        </section>

        <section className={styles.stage} aria-label="Escena del taller" aria-busy={scene === 'loading'}>
          <div className={styles.stageTop}><span><span className={styles.dot} /> Taller / 01</span><span>Vista isométrica</span></div>
          <div className={styles.sceneWrap}>
            {scene !== 'failed' && (
              <SceneBoundary onFailure={sceneFailed}>
                <Suspense fallback={null}>
                  <Studio
                    reset={reset}
                    onReady={sceneReady}
                    onFailure={sceneFailed}
                    monitor={{
                      selected,
                      playing: playback === 'monitor',
                      onOpen: openProjects,
                      onSelect: selectProject,
                      onPlay: () => setPlayback('monitor'),
                      onStop: stopPlayback,
                    }}
                  />
                </Suspense>
              </SceneBoundary>
            )}
            {scene === 'loading' && (
              <p role="status" className={styles.sceneMessage}><span className={styles.loader} /> Preparando el taller…</p>
            )}
            {scene === 'failed' && (
              <div className={styles.sceneMessage}>
                <p role="status">No se pudo cargar la escena 3D.</p>
                <button type="button" className={styles.secondary} onClick={() => setScene('loading')}>Reintentar</button>
              </div>
            )}
          </div>
          <div className={styles.stageBottom}>
            {scene === 'ready' && (
              <>
                <span><span aria-hidden="true">↔</span> Arrastra para orbitar <span className={styles.hintDivider}>·</span> <span className={styles.zoomHint}>Rueda o pellizco para acercar</span></span>
                <button type="button" aria-label="Restablecer vista" onClick={resetView}>↺ <span>Restablecer</span></button>
              </>
            )}
          </div>
        </section>
      </main>

      {panelOpen && (
        <ProjectsPanel
          selected={selected}
          playing={playback === 'panel'}
          onSelect={selectProject}
          onPlay={() => setPlayback('panel')}
          onStop={stopPlayback}
          onClose={closeProjects}
        />
      )}

      <footer className={styles.footer}><span>© 2026 Cristian Cabrera</span><span>React Three Fiber <b>·</b> Three.js <b>·</b> TypeScript</span></footer>
    </div>
  )
}
