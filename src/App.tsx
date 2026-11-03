import { lazy, Suspense, useCallback, useState } from 'react'
import { SceneBoundary } from '@/components/SceneBoundary'
import styles from './App.module.css'

const Studio = lazy(() => import('@/scenes/Studio'))

export default function App() {
  const [scene, setScene] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [reset, setReset] = useState(0)
  const sceneReady = useCallback(() => setScene('ready'), [])
  const sceneFailed = useCallback(() => setScene('failed'), [])

  return (
    <main className={styles.app}>
      <section className={styles.stage} aria-label="Escena del taller" aria-busy={scene === 'loading'}>
        {scene !== 'failed' && (
          <SceneBoundary onFailure={sceneFailed}>
            <Suspense fallback={null}>
              <Studio reset={reset} onReady={sceneReady} onFailure={sceneFailed} />
            </Suspense>
          </SceneBoundary>
        )}
        {scene === 'loading' && <p role="status" className={styles.sceneMessage}>Preparando el taller…</p>}
        {scene === 'failed' && (
          <div className={styles.sceneMessage}>
            <p role="status">No se pudo cargar la escena 3D.</p>
            <button type="button" onClick={() => setScene('loading')}>Reintentar</button>
          </div>
        )}
        <button type="button" className={styles.reset} onClick={() => setReset((value) => value + 1)}>Restablecer vista</button>
      </section>
    </main>
  )
}
