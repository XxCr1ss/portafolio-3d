import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          includeDependenciesRecursively: false,
          groups: [
            { name: 'three-core', test: /[\\/]three[\\/]build[\\/]three\.core\.js$/ },
            { name: 'three-renderer', test: /[\\/]three[\\/]build[\\/]three\.module\.js$/ },
          ],
        },
      },
    },
  },
})
