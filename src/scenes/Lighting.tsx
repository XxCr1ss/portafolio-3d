import { ContactShadows, Environment, Lightformer } from '@react-three/drei'

export function Lighting() {
  return (
    <>
      <hemisphereLight args={['#fff5e6', '#a39177', 1.25]} />
      <directionalLight position={[4, 8, 5]} color="#fff1d8" intensity={2.2} />
      <Environment resolution={64} frames={1} environmentIntensity={0.45}>
        <Lightformer intensity={2} color="#fff3d8" position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={6} />
        <Lightformer intensity={1} color="#d5e6eb" position={[-5, 2, 2]} rotation-y={-Math.PI / 2} scale={4} />
      </Environment>
      <ContactShadows
        position={[0, 0.015, 0]}
        scale={[8.5, 7.5]}
        far={3.4}
        opacity={0.48}
        blur={2.6}
        color="#3c2e1d"
        resolution={512}
        frames={1}
      />
    </>
  )
}
