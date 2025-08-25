/* eslint-disable prettier/prettier */
import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    hookTimeout: 30000, // 30 segundos
    testTimeout: 30000,
    root: './',
    setupFiles: ['./test/setup-e2e.ts'],
  },
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})