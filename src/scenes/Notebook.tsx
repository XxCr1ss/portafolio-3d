import { useState } from 'react'
import { useCursor } from '@react-three/drei'
import { Box, palette } from './Furniture'

export function Notebook({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  return (
    <group
      position={[-1.18, 1.6, -0.05]}
      rotation-y={-0.12}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(event) => {
        event.stopPropagation()
        if (event.delta <= 4) onOpen()
      }}
    >
      <Box size={[0.88, 0.035, 0.62]} position={[0, 0.022, 0]} color={palette.ink} />
      <Box size={[0.84, 0.047, 0.58]} position={[0.01, 0.055, 0]} color={palette.linen} />
      <Box size={[0.88, 0.028, 0.62]} position={[0, 0.089, 0]} color={hovered ? '#a9b78a' : '#78896c'} />
      <Box size={[0.058, 0.031, 0.621]} position={[-0.405, 0.09, 0]} color="#455742" />
      <Box size={[0.32, 0.004, 0.15]} position={[0.04, 0.106, -0.035]} color={palette.linen} />
    </group>
  )
}
