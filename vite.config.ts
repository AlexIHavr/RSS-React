import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/alexihavr-REACT2024Q3/class-components/',
  plugins: [
    tsconfigPaths(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint ./src' },
      stylelint: { lintCommand: 'stylelint ./src/**/*.scss' },
    }),
    react(),
  ],
});
