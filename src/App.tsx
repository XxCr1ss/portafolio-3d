import { Canvas } from '@react-three/fiber'
import { Lighting } from '@/scenes/Lighting'

export default function App() {
  return (
    <main style={{ height: '100dvh', background: '#e7dfcf' }}>
      <Canvas camera={{ position: [4, 3, 5] }}>
        <Lighting />
        <mesh position={[0, 0.58, 0]} rotation-y={0.3}>
          <boxGeometry />
          <meshStandardMaterial color="#ab8053" metalness={0.2} roughness={0.5} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2}>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial color="#bca88f" />
        </mesh>
      </Canvas>
    </main>
  )
}
