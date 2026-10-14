import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  server: { host: '127.0.0.1', port: 5173, strictPort: true },
  preview: { host: '127.0.0.1', port: 5173, strictPort: true },
  build: {outDir: '.release', emptyOutDir: true, assetsDir: 'engine', target: 'es2020', sourcemap: false},
});
