import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    setupFiles: ["./vitest-setup.ts"],
    environment: "jsdom",
    restoreMocks: true,
  },
})
