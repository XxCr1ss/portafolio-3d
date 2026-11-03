import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <main style={{ height: '100dvh', background: '#e7dfcf' }}>
      <Canvas camera={{ position: [4, 3, 5] }}>
        <ambientLight intensity={1.8} />
        <mesh rotation={[0.35, 0.45, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#ab8053" />
        </mesh>
      </Canvas>
    </main>
  )
}
