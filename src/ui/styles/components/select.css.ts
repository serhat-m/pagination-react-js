import { style } from "@vanilla-extract/css"
import { colors, vars } from "../themes"

const arrowDown = `url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 448 512' style='enable-background:new 0 0 448 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23686867;%7D%0A%3C/style%3E%3Cpath class='st0' d='M224,416c-8.2,0-16.4-3.1-22.6-9.4l-192-192c-12.5-12.5-12.5-32.8,0-45.2s32.8-12.5,45.2,0L224,338.8 l169.4-169.4c12.5-12.5,32.8-12.5,45.2,0s12.5,32.8,0,45.2l-192,192C240.4,412.9,232.2,416,224,416z'/%3E%3C/svg%3E%0A")`

export const selectStyle = style({
  WebkitAppearance: "none",
  MozAppearance: "none",
  padding: `${vars.spacing[200]} ${vars.spacing[300]} ${vars.spacing[200]} ${vars.spacing[200]}`,
  width: "fit-content",
  border: `${vars.border.size} solid ${colors.default.background[100]}`,
  borderRadius: vars.border.radius,
  cursor: "pointer",
  transition: "all 150ms ease",
  backgroundImage: arrowDown,
  backgroundRepeat: "no-repeat",
  backgroundPositionY: "center",
  backgroundSize: ".65rem",
  backgroundPosition: `right ${vars.spacing[200]} center`,
  ":hover": {
    backgroundColor: colors.default.background[100],
  },
  ":focus": {
    outline: "none",
    backgroundColor: colors.default.background[100],
  },
})
