export type Project = {
  id: string
  title: string
  description: string
  technologies: readonly string[]
  poster: string
  video?: string
  codeUrl?: string
  demoUrl?: string
}

export const projects: readonly Project[] = [
  {
    id: 'taller-isometrico',
    title: 'Taller isométrico',
    description: 'Portafolio web interactivo ambientado en un taller de diseño. La escena combina cámara ortográfica, materiales PBR y controles HTML sobre un diorama modelado con primitivas.',
    technologies: ['React', 'Three.js', 'React Three Fiber', 'TypeScript'],
    poster: '/projects/taller-isometrico.webp',
    video: '/projects/taller-isometrico.webm',
    codeUrl: 'https://github.com/XxCr1ss/portafolio-3d',
  },
]
