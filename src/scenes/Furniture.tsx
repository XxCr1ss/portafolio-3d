import type { ThreeElements } from '@react-three/fiber'

type Dimensions = [number, number, number]
type BoxProps = {
  size: Dimensions
  color: string
  metalness?: number
} & Pick<ThreeElements['mesh'], 'position' | 'rotation'>

export const palette = {
  ink: '#303831',
  oak: '#ae784c',
  pale: '#e1bd8d',
  linen: '#f3e8d1',
  sage: '#879477',
  rust: '#a45337',
}

export function Box({ size, color, metalness = 0, ...placement }: BoxProps) {
  return (
    <mesh {...placement}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.76} metalness={metalness} />
    </mesh>
  )
}

export function Room() {
  return (
    <>
      <Box size={[8.4, 0.24, 6.6]} position={[0, -0.29, 0]} color="#79543a" />
      <Box size={[8.2, 0.24, 6.4]} position={[0, -0.12, 0]} color="#c69c70" />
      {[-2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4].map((z) => (
        <Box key={z} size={[8.17, 0.006, 0.013]} position={[0, 0.004, z]} color="#a77c55" />
      ))}
      <Box size={[8.2, 3.25, 0.19]} position={[0, 1.62, -3.12]} color="#e0d5bb" />
      <Box size={[0.19, 3.25, 6.23]} position={[-4.01, 1.62, 0.07]} color="#a0ab8b" />
      <Box size={[8.2, 0.13, 0.09]} position={[0, 0.1, -2.98]} color="#bbaa8c" />
      <Box size={[0.09, 0.13, 6.17]} position={[-3.88, 0.1, 0.08]} color="#7c8b6e" />
      <group position={[1.48, 2.08, -2.99]}>
        <Box size={[2.84, 1.69, 0.1]} color="#8b6e53" />
        <Box size={[2.67, 1.53, 0.055]} position={[0, 0, 0.068]} color="#b6c8c1" />
        <Box size={[0.06, 1.55, 0.075]} position={[0, 0, 0.098]} color={palette.linen} />
        <Box size={[2.68, 0.05, 0.075]} position={[0, 0.21, 0.098]} color={palette.linen} />
        <Box size={[2.98, 0.08, 0.28]} position={[0, -0.84, 0.12]} color={palette.pale} />
      </group>
      <group position={[-3.89, 2.03, -0.98]} rotation-y={Math.PI / 2}>
        <Box size={[1.3, 1.45, 0.1]} color="#675a45" />
        <Box size={[1.17, 1.32, 0.02]} position={[0, 0, 0.061]} color="#ece0c7" />
        <Box size={[0.72, 0.72, 0.015]} position={[0, 0.045, 0.077]} rotation-z={Math.PI / 4} color={palette.sage} />
        <Box size={[0.53, 0.53, 0.015]} position={[0, 0.045, 0.088]} rotation-z={Math.PI / 4} color="#ece0c7" />
        <Box size={[0.59, 0.035, 0.015]} position={[0, -0.52, 0.077]} color={palette.rust} />
      </group>
    </>
  )
}

export function Desk() {
  return (
    <>
      <Box size={[5.6, 0.18, 2.46]} position={[0.12, 1.46, -0.71]} color={palette.oak} />
      <Box size={[5.55, 0.04, 2.42]} position={[0.12, 1.57, -0.71]} color={palette.pale} />
      <Box size={[1.0, 1.31, 1.92]} position={[-1.88, 0.71, -0.73]} color="#ab845c" />
      {[0.28, 0.68, 1.08].map((y) => (
        <group key={y} position={[-1.88, y, 0.24]}>
          <Box size={[0.94, 0.36, 0.09]} color={palette.pale} />
          <Box size={[0.28, 0.038, 0.08]} position={[0, 0.08, 0.065]} color={palette.ink} metalness={0.28} />
        </group>
      ))}
      {[-1.68, 0.22].map((z) => (
        <Box key={z} size={[0.13, 1.4, 0.13]} position={[2.59, 0.7, z]} color={palette.ink} metalness={0.35} />
      ))}
      <Box size={[0.13, 0.13, 2.02]} position={[2.59, 0.13, -0.73]} color={palette.ink} metalness={0.35} />
      <Box size={[1.25, 0.018, 0.61]} position={[0.52, 1.608, -0.13]} color="#837d6a" />
      <Box size={[0.95, 0.065, 0.34]} position={[0.48, 1.65, -0.19]} color={palette.linen} />
      {[0, 1, 2].map((line) => (
        <Box key={line} size={[0.82, 0.011, 0.021]} position={[0.48, 1.69, -0.28 + line * 0.082]} color="#9b8e75" />
      ))}
      <Box size={[0.19, 0.067, 0.29]} position={[1.33, 1.65, -0.12]} color={palette.linen} />
      <group position={[2.18, 1.6, -1.31]}>
        <mesh position-y={0.042}>
          <cylinderGeometry args={[0.28, 0.31, 0.084, 18]} />
          <meshStandardMaterial color="#a65c3f" />
        </mesh>
        <Box size={[0.06, 0.88, 0.06]} position={[0.09, 0.48, 0]} rotation-z={-0.19} color="#a65c3f" metalness={0.25} />
        <Box size={[0.43, 0.06, 0.06]} position={[-0.04, 0.92, 0]} rotation-z={0.22} color="#a65c3f" metalness={0.25} />
        <mesh position={[-0.28, 0.79, 0]} rotation-z={-0.3}>
          <cylinderGeometry args={[0.13, 0.25, 0.24, 16]} />
          <meshStandardMaterial color="#a65c3f" />
        </mesh>
      </group>
    </>
  )
}

export function Chair() {
  return (
    <group position={[0.29, 0, 1.56]} rotation-y={-0.18}>
      <Box size={[1.22, 0.18, 1.03]} position={[0, 0.83, 0]} color={palette.sage} />
      <Box size={[1.16, 0.67, 0.16]} position={[0, 1.31, 0.5]} rotation-x={0.13} color={palette.sage} />
      {[-0.46, 0.46].map((x) => (
        <group key={x} position-x={x}>
          <Box size={[0.1, 0.73, 0.1]} position={[0, 0.37, -0.35]} color={palette.ink} />
          <Box size={[0.1, 1.17, 0.1]} position={[0, 0.6, 0.42]} rotation-x={-0.1} color={palette.ink} />
        </group>
      ))}
    </group>
  )
}

export function Plant() {
  return (
    <group position={[-2.03, 1.6, -1.24]}>
      <mesh position-y={0.18}>
        <cylinderGeometry args={[0.25, 0.18, 0.36, 14]} />
        <meshStandardMaterial color={palette.rust} />
      </mesh>
      {Array.from({ length: 6 }, (_, index) => (
        <group key={index} rotation-y={index * Math.PI / 3}>
          <mesh position={[0.17, 0.46 + (index % 2) * 0.11, 0]} rotation-z={-0.67} scale={[0.1, 0.24, 0.085]}>
            <sphereGeometry args={[1, 7, 5]} />
            <meshStandardMaterial color={index % 2 ? '#537355' : '#788a57'} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
