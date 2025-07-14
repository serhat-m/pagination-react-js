import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    port: 3007,
  },
  build: {
    rollupOptions: {
      output: {
        dir: "build",
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
  base: "./",
})
