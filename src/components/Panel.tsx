import { useEffect, useRef, type ReactNode } from 'react'
import styles from '@/App.module.css'

type Props = {
  eyebrow: string
  title: string
  children: ReactNode
  onClose: () => void
}

export function Panel({ eyebrow, title, children, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const element = dialog.current
    element?.showModal()
    return () => element?.close()
  }, [])

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="panel-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect()
          if (event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom) onClose()
        }
      }}
    >
      <header className={styles.dialogHeader}>
        <div>
          <p className={styles.kicker}>{eyebrow}</p>
          <h2 id="panel-title">{title}</h2>
        </div>
        <button type="button" className={styles.close} aria-label="Cerrar panel" onClick={onClose}>×</button>
      </header>
      {children}
    </dialog>
  )
}
