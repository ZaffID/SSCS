import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin(), tailwindcss()],
  optimizeDeps: {
    // Hindari esbuild mengoptimasi paket ikon sehingga tidak di-transpile sebagai React
    exclude: ['solid-icons', 'solid-icons/*'],
  },
  ssr: {
    // Pastikan saat SSR (jika ada), paket tidak diexternal-kan dengan format berbeda
    noExternal: ['solid-icons'],
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
