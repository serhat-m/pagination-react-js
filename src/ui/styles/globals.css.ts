import { globalStyle } from "@vanilla-extract/css"
import { colors } from "./themes"

globalStyle("html", {
  fontSize: "1rem",
  backgroundColor: colors.default.background[100],
  color: colors.default.text[100],
  lineHeight: "1.4",
})
