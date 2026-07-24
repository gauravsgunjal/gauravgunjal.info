/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * Vitest configuration for the Angular 20 standalone app.
 *
 * `@analogjs/vite-plugin-angular` compiles Angular components/templates
 * (including inline and external templates/styles) through the Angular
 * compiler inside Vite, so `TestBed`-based specs work exactly as they would
 * under the classic Angular CLI/Karma pipeline — just faster, and without
 * needing a real browser.
 */
export default defineConfig({
  plugins: [angular(), tsconfigPaths()],
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    reporters: ['default'],
    watch: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      reportsDirectory: './coverage/portfolio',
      include: ['src/app/**/*.ts'],
      exclude: [
        'src/app/**/*.spec.ts',
        'src/app/**/*.model.ts',
        'src/app/**/index.ts',
        'src/main.ts',
        'src/app/app.routes.ts',
        'src/app/app.config.ts'
      ],
      thresholds: {
        // Intentionally modest starting thresholds — raise these as more
        // specs are added. CI fails the build if coverage drops below them.
        lines: 15,
        statements: 15,
        branches: 15,
        functions: 15
      }
    }
  }
});
