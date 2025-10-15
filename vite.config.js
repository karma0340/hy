import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animation: ['framer-motion', 'maath']
        },
      },
    },
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
  },
  server: {
    port: 3000,
    open: true
  }
});
