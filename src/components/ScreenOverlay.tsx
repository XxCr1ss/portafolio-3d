import { useState, type ReactNode, type RefObject } from 'react'
import { Html } from '@react-three/drei'
import type { Object3D } from 'three'

type Props = {
  children: ReactNode
  position: [number, number, number]
  occluders: RefObject<Object3D>[]
  onVisibilityChange?: (visible: boolean) => void
}

export function ScreenOverlay({ children, position, occluders, onVisibilityChange }: Props) {
  const [hidden, setHidden] = useState(false)

  return (
    <Html
      transform
      position={position}
      occlude={occluders}
      onOcclude={(occluded) => {
        setHidden(occluded)
        onVisibilityChange?.(!occluded)
      }}
      distanceFactor={4}
      zIndexRange={[3, 1]}
    >
      <div
        inert={hidden}
        aria-hidden={hidden}
        style={{ visibility: hidden ? 'hidden' : 'visible' }}
        onPointerDown={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </Html>
  )
}
