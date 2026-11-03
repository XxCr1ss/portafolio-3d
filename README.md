# portafolio-3d

Taller isométrico interactivo de Cristian Cabrera. Proyecto de Diseño de Experiencias Web 3D.

## Desarrollo local

Usa Node 24 (ver `.nvmrc`).

```bash
npm ci
npm run dev
```

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

## Sprint 1

Desde Inicio se puede orbitar, acercar y restablecer el encuadre. El monitor abre la galería y permite reproducir un clip del taller. El cuaderno abre la biografía y las habilidades. Proyectos y Sobre mí también están disponibles desde el menú.

Los contenidos se editan en `src/data`. La imagen y el clip de demostración se capturaron a partir del diorama de este repositorio. La iluminación se genera en la propia escena. Las fuentes Manrope y Space Mono se distribuyen localmente mediante Fontsource.

## Preview en Vercel

Importa este repositorio en Vercel y selecciona `main` como rama de producción. El proyecto usa Node 24, la configuración de Vite de `vercel.json` y el directorio de salida `dist/`. La integración con GitHub aporta una URL de preview al abrir el PR.
