import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    port: 3005,
  },
  build: {
    rollupOptions: {
      output: {
        dir: "build",
        // assetFileNames: (assetInfo) => {
        //   const info = assetInfo.names[0].split(".")
        //   let extType = info[info.length - 1]

        //   if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
        //     extType = "img"
        //   } else if (/woff|woff2/.test(extType)) {
        //     extType = "fonts"
        //   }

        //   return `assets/${extType}/[name]-[hash][extname]`
        // },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
  base: "./",
})
