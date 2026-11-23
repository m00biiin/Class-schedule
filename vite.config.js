import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base نسبی است تا روی GitHub Pages (آدرس با نام مخزن) درست کار کند
export default defineConfig({
  base: './',
  plugins: [react()],
});
