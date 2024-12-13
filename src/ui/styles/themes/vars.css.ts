import { createGlobalTheme, createGlobalThemeContract } from "@vanilla-extract/css"
import { inter } from "../base/fonts.css"

export const vars = createGlobalThemeContract(
  {
    font: {
      inter: {
        family: null,
        weight: {
          "400": null,
          "500": null,
          "600": null,
        },
      },
    },
    spacing: {
      "100": null,
      "150": null,
      "200": null,
      "250": null,
      "300": null,
    },
    border: {
      radius: null,
      size: null,
    },
  },
  (_value, path) => path.join("-"),
)

createGlobalTheme(":root", vars, {
  font: {
    inter: {
      family: inter,
      weight: {
        "400": "400",
        "500": "500",
        "600": "600",
      },
    },
  },
  spacing: {
    "100": ".2rem",
    "150": ".4rem",
    "200": ".65rem",
    "250": "1.1rem",
    "300": "1.5rem",
  },
  border: {
    radius: ".5rem",
    size: ".125rem",
  },
})
