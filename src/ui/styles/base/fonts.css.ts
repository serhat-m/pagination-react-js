import { fontFace } from "@vanilla-extract/css"

export const inter = fontFace([
  {
    src: [
      'url("/assets/fonts/inter-v12-latin/inter-v12-latin-regular.woff2") format("woff2")',
      'url("/assets/fonts/inter-v12-latin/inter-v12-latin-regular.woff") format("woff")',
    ],
    fontWeight: 400,
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    src: [
      'url("/assets/fonts/inter-v12-latin/inter-v12-latin-500.woff2") format("woff2")',
      'url("/assets/fonts/inter-v12-latin/inter-v12-latin-500.woff") format("woff")',
    ],
    fontWeight: 500,
    fontStyle: "normal",
    fontDisplay: "swap",
  },
  {
    src: [
      'url("/assets/fonts/inter-v12-latin/inter-v12-latin-600.woff2") format("woff2")',
      'url("/assets/fonts/inter-v12-latin/inter-v12-latin-600.woff") format("woff")',
    ],
    fontWeight: 600,
    fontStyle: "normal",
    fontDisplay: "swap",
  },
])
