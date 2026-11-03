import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { AboutPanel } from '@/components/AboutPanel'
import { ProjectsPanel } from '@/components/ProjectsPanel'
import { SceneBoundary } from '@/components/SceneBoundary'
import styles from './App.module.css'

class SceneDownloadError extends Error {}

const Studio = lazy(() => import('@/scenes/Studio').catch((cause) => {
  throw new SceneDownloadError('No se pudo descargar la escena.', { cause })
}))

export default function App() {
  const [scene, setScene] = useState<'loading' | 'ready' | 'failed' | 'downloadFailed'>('loading')
  const [reset, setReset] = useState(0)
  const [panel, setPanel] = useState<'projects' | 'about' | null>(null)
  const [selected, setSelected] = useState(0)
  const [playback, setPlayback] = useState<'monitor' | 'panel' | null>(null)
  const projectsButton = useRef<HTMLButtonElement>(null)
  const aboutButton = useRef<HTMLButtonElement>(null)
  const panelOrigin = useRef<HTMLButtonElement | null>(null)
  const sceneReady = useCallback(() => setScene('ready'), [])
  const sceneFailed = useCallback((error?: Error) => {
    setPlayback((current) => current === 'monitor' ? null : current)
    setScene(error instanceof SceneDownloadError ? 'downloadFailed' : 'failed')
  }, [])
  const sceneUnavailable = scene === 'failed' || scene === 'downloadFailed'

  const retryScene = () => {
    // A failed dynamic import stays cached for the lifetime of the page.
    if (scene === 'downloadFailed') window.location.reload()
    else setScene('loading')
  }

  const openPanel = (section: 'projects' | 'about', origin?: HTMLButtonElement | null) => {
    panelOrigin.current = origin ?? (section === 'projects' ? projectsButton.current : aboutButton.current)
    setPlayback(null)
    setPanel(section)
  }

  const closePanel = () => {
    const origin = panelOrigin.current
    setPlayback(null)
    setPanel(null)
    requestAnimationFrame(() => origin?.focus())
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
          <button ref={projectsButton} type="button" onClick={() => openPanel('projects')}>Proyectos <span>(Monitor)</span></button>
          <button ref={aboutButton} type="button" onClick={() => openPanel('about')}>Sobre mí <span>(Cuaderno)</span></button>
        </nav>
        <span className={styles.issue}>Edición 01 / 2026</span>
      </header>

      <main className={styles.layout}>
        <section className={styles.intro} aria-labelledby="main-title">
          <p className={styles.kicker}><span className={styles.dot} /> Portafolio interactivo</p>
          <h1 id="main-title">Taller{' '}<em>isométrico.</em></h1>
          <p className={styles.introCopy}>Soy Cristian Cabrera. Este es mi espacio de trabajo digital para explorar diseño, código y experiencias web en 3D.</p>
          <div className={styles.actions}>
            <button type="button" onClick={(event) => openPanel('projects', event.currentTarget)} className={styles.primary}>Explorar proyectos <span aria-hidden="true">↗</span></button>
            <button type="button" onClick={(event) => openPanel('about', event.currentTarget)} className={styles.secondary}>Sobre mí</button>
          </div>
        </section>

        <section className={styles.stage} aria-label="Escena del taller" aria-busy={scene === 'loading'}>
          <div className={styles.stageTop}><span><span className={styles.dot} /> Taller / 01</span><span>Vista isométrica</span></div>
          <div className={styles.sceneWrap}>
            {!sceneUnavailable && (
              <SceneBoundary onFailure={sceneFailed}>
                <Suspense fallback={null}>
                  <Studio
                    reset={reset}
                    onOpenNotebook={() => openPanel('about')}
                    onReady={sceneReady}
                    onFailure={sceneFailed}
                    monitor={{
                      selected,
                      playing: playback === 'monitor',
                      onOpen: () => openPanel('projects'),
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
            {sceneUnavailable && (
              <div className={styles.sceneMessage}>
                <p role="status">No se pudo cargar la escena 3D.</p>
                <button type="button" className={styles.secondary} onClick={retryScene}>Reintentar</button>
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

      {panel === 'projects' && (
        <ProjectsPanel
          selected={selected}
          playing={playback === 'panel'}
          onSelect={selectProject}
          onPlay={() => setPlayback('panel')}
          onStop={stopPlayback}
          onClose={closePanel}
        />
      )}

      {panel === 'about' && <AboutPanel onClose={closePanel} />}

      <footer className={styles.footer}><span>© 2026 Cristian Cabrera</span><span>React Three Fiber <b>·</b> Three.js <b>·</b> TypeScript</span></footer>
    </div>
  )
}
