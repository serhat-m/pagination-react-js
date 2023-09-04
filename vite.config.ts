import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3005,
  },
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/
      output: {
        dir: "build",
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split(".")
          let extType = info[info.length - 1]

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img"
          } else if (/woff|woff2/.test(extType)) {
            extType = "fonts"
          }

          return `assets/${extType}/[name]-[hash][extname]`
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
  base: "./",
})
