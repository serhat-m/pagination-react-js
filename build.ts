import { build, type Options } from "tsup"

const options: Options = {
  tsconfig: "./tsconfig.app.json",
  entry: ["src/package/index.ts"],
  sourcemap: false,
  minify: false,
  dts: true,
  clean: true,
}

// ESM build
await build({
  ...options,
  format: "esm",
  outDir: "dist/esm",
})

// CJS build
await build({
  ...options,
  format: "cjs",
  outDir: "dist/cjs",
})
