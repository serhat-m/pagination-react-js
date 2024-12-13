import { style } from "@vanilla-extract/css"
import { colors, vars } from "./ui/styles/themes"
import { interFont } from "./ui/styles/tokens"

const containerStyle = style({
  margin: "0 auto",
  maxWidth: 800,
  padding: `0 ${vars.spacing[300]}`,
})

export const headerStyle = style([
  interFont["500"],
  containerStyle,
  {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    margin: `${vars.spacing[200]} auto`,
    marginTop: vars.spacing[300],
  },
])

export const maxElementsSelectStyle = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing[150],
})

export const mainStyle = style([containerStyle])

export const paginationWrapperStyle = style({
  overflowX: "auto",
})

export const paginationStyle = style([
  interFont["500"],
  {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: vars.spacing[150],
    width: "fit-content",
    listStyleType: "none",
    border: `${vars.border.size} solid ${colors.default.background[100]}`,
    padding: `${vars.spacing[150]} ${vars.spacing[200]}`,
    borderRadius: vars.border.radius,
    margin: `${vars.spacing[200]} auto`,
    userSelect: "none",
  },
])

export const paginationItemStyle = style({
  width: "2rem",
  height: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.border.radius,
  flexShrink: 0,
  ":hover": {
    cursor: "pointer",
    backgroundColor: colors.default.background[100],
  },
  ":focus-visible": {
    outline: `calc(${vars.border.size} * 1.5) solid ${colors.default.text[100]}`,
  },
})

export const paginationItemActiveStyle = style({
  color: colors.default.background[0],
  backgroundColor: colors.default.primary[100],
  pointerEvents: "none",
  transition: "background-color 0.1s",
  ":hover": {
    backgroundColor: colors.default.primary[100],
  },
})
