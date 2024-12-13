import { createGlobalThemeContract, createTheme } from "@vanilla-extract/css"

const backgroundColorsContract = {
  "0": null,
  "100": null,
}

const textColorsContract = {
  "100": null,
}

const primaryColorsContract = {
  "100": null,
}

export const colors = createGlobalThemeContract(
  {
    default: {
      background: backgroundColorsContract,
      text: textColorsContract,
      primary: primaryColorsContract,
    },
  },
  (_value, path) => {
    path[0] = "color"
    return path.join("-")
  },
)

export const light = createTheme(colors, {
  default: {
    background: {
      "0": "rgb(255, 255, 255)",
      "100": "rgb(225, 228, 231)",
    },
    text: {
      "100": "rgb(40, 53, 64)",
    },
    primary: {
      "100": "rgb(10, 126, 163)",
    },
  },
})
