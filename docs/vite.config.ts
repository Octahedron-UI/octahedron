import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [react()],
  resolve: {
    alias: {
      octahedron: path.resolve(__dirname, '../src'),
      'octahedron/tokens.css': path.resolve(__dirname, '../src/tokens.css'),
      'octahedron/brand.css': path.resolve(__dirname, '../src/brand.css'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  server: {
    port: 4000,
  },
});
