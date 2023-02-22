import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environmentMatchGlobs: [
      ['__tests__/**', 'happy-dom'],
      ['server/__tests__/**', 'node']
    ],
    coverage: {
      provider: 'istanbul'
    }
  },
})