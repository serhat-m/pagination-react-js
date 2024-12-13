import { style } from "@vanilla-extract/css"
import { colors, vars } from "../themes"
import { interFont } from "../tokens"

export const tableWrapperStyle = style([
  interFont["500"],
  {
    overflowX: "auto",
  },
])

export const tableStyle = style({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: `0 ${vars.spacing[200]}`,
  tableLayout: "auto",
})

export const tableHeadStyle = style({
  color: colors.default.background[0],
})

export const tableHeaderCellStyle = style({
  backgroundColor: colors.default.primary[100],
  padding: vars.spacing[200],
  textAlign: "center",
  width: "auto",
  selectors: {
    "&:first-child": {
      borderTopLeftRadius: vars.border.radius,
      borderBottomLeftRadius: vars.border.radius,
    },
    "&:last-child": {
      borderTopRightRadius: vars.border.radius,
      borderBottomRightRadius: vars.border.radius,
    },
  },
})

export const tableBodyRowStyle = style({
  selectors: {
    "&:hover": {
      backgroundColor: colors.default.background[100],
    },
  },
})

export const tableCellStyle = style({
  padding: vars.spacing[200],
  borderTop: `${vars.border.size} solid ${colors.default.background[100]}`,
  borderBottom: `${vars.border.size} solid ${colors.default.background[100]}`,
  textAlign: "center",
  whiteSpace: "nowrap",
  selectors: {
    "&:first-child": {
      borderLeft: `${vars.border.size} solid ${colors.default.background[100]}`,
      borderTopLeftRadius: vars.border.radius,
      borderBottomLeftRadius: vars.border.radius,
    },
    "&:last-child": {
      borderRight: `${vars.border.size} solid ${colors.default.background[100]}`,
      borderTopRightRadius: vars.border.radius,
      borderBottomRightRadius: vars.border.radius,
    },
  },
})
