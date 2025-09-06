import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Allow external connections (fixes "Blocked request" error)
    port: 8080,
    open: true, // Automatically open browser on Windows
    strictPort: false, // Allow fallback to different port if 8080 is busy
    cors: true, // Enable CORS for all origins
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-tooltip', '@radix-ui/react-dialog'],
        },
      },
    },
  },
}));
