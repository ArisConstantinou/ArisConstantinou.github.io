import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  server: {host:'0.0.0.0',port:4175,strictPort:true,allowedHosts:['terminal.local']},
  build: {target:'es2022',chunkSizeWarningLimit:1000,outDir:process.env.CODEX_BUILD_OUTPUT||'dist',emptyOutDir:false}
});

