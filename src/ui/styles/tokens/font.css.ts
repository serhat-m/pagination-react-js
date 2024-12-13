import { style, styleVariants } from "@vanilla-extract/css"
import { vars } from "../themes"

type brand2FontWeights = keyof typeof vars.font.inter.weight
const brand2FontShared = style([
  {
    fontFamily: vars.font.inter.family,
  },
])

export const interFont: Record<brand2FontWeights, string> = styleVariants(
  {
    "400": [
      brand2FontShared,
      {
        fontWeight: vars.font.inter.weight[400],
      },
    ],
    "500": [
      brand2FontShared,
      {
        fontWeight: vars.font.inter.weight[500],
      },
    ],
    "600": [
      brand2FontShared,
      {
        fontWeight: vars.font.inter.weight[600],
      },
    ],
  },
  "brand2Font",
)
