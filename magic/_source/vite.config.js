import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  build: {outDir: '.release', emptyOutDir: true, assetsDir: 'engine', target: 'es2020', sourcemap: false},
});
