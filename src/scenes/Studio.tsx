import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { OrthographicCamera } from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Box, Chair, Desk, palette, Plant, Room } from '@/scenes/Furniture'
import { Lighting } from '@/scenes/Lighting'
import studioFont from '@fontsource/space-mono/files/space-mono-latin-400-normal.woff?url'

const initialPosition: [number, number, number] = [9, 7.2, 11]
const target: [number, number, number] = [0, 1.26, 0]
const cameraOptions = { position: initialPosition, near: 0.1, far: 70 }
const glOptions = { antialias: true, alpha: true, powerPreference: 'high-performance' } as const

function StudioCamera({ reset }: { reset: number }) {
  const controls = useRef<OrbitControlsImpl>(null)
  const { size, invalidate } = useThree()
  const fitZoom = Math.min(size.width / 11.2, size.height / 8.2)

  useLayoutEffect(() => {
    const orbit = controls.current
    const camera = orbit?.object
    if (!orbit || !(camera instanceof OrthographicCamera)) return

    camera.position.set(...initialPosition)
    camera.zoom = fitZoom
    camera.updateProjectionMatrix()
    orbit.target.set(...target)
    orbit.update()
    invalidate()
  }, [fitZoom, invalidate, reset])

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping={false}
      minAzimuthAngle={0.28}
      maxAzimuthAngle={1.18}
      minPolarAngle={0.81}
      maxPolarAngle={1.28}
      minZoom={fitZoom * 0.83}
      maxZoom={fitZoom * 1.43}
    />
  )
}

function SceneStatus({ onReady, onFailure }: { onReady: () => void; onFailure: () => void }) {
  const notified = useRef(false)
  const canvas = useThree((state) => state.gl.domElement)

  useEffect(() => {
    canvas.addEventListener('webglcontextlost', onFailure)
    return () => canvas.removeEventListener('webglcontextlost', onFailure)
  }, [canvas, onFailure])

  useFrame(() => {
    if (notified.current) return
    notified.current = true
    queueMicrotask(onReady)
  })
  return null
}

type StudioProps = {
  reset: number
  onReady: () => void
  onFailure: () => void
}

export default function Studio({ reset, onReady, onFailure }: StudioProps) {
  return (
    <Canvas
      orthographic
      camera={cameraOptions}
      gl={glOptions}
      dpr={[1, 1.5]}
      frameloop="demand"
      aria-label="Taller isométrico de diseño"
    >
      <StudioCamera reset={reset} />
      <Suspense fallback={null}>
        <Lighting />
        <Room />
        <Desk />
        <Chair />
        <Plant />
        <Text position={[-1.55, 2.74, -3.01]} font={studioFont} fontSize={0.15} color="#5b604b" letterSpacing={0.08}>WORKSPACE / 01</Text>
        <Box size={[2.02, 1.17, 0.13]} position={[0.34, 2.48, -1.25]} color={palette.ink} />
        <Box size={[0.88, 0.1, 0.62]} position={[-1.18, 1.66, -0.05]} color={palette.sage} />
        <SceneStatus onReady={onReady} onFailure={onFailure} />
      </Suspense>
    </Canvas>
  )
}
