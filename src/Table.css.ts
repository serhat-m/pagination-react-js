import { style } from "@vanilla-extract/css"
import { colors, vars } from "./ui/styles/themes"

export const tableWrapperStyle = style({
  overflowX: "auto",
})

// Basis-Tabelle
export const tableStyle = style({
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
  tableLayout: "auto",
})

// Zeilen in der Tabelle
export const tableRowStyle = style({
  backgroundColor: "white",
})

// Kopfzeile
export const tableHeadStyle = style({
  color: "white",
})

export const tableHeaderCellStyle = style({
  backgroundColor: colors.default.primary[100],
  fontWeight: "500",
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

// Körper der Tabelle
export const tableBodyStyle = style({})

export const tableBodyRowStyle = style({
  transition: "background-color 0.1s",
  selectors: {
    "&:hover": {
      backgroundColor: colors.default.background[100],
    },
  },
})

// Zellen im Tabellenkörper
export const tableCellStyle = style({
  fontWeight: "500",
  padding: vars.spacing[200],
  borderTop: `2px solid ${colors.default.background[100]}`,
  borderBottom: `2px solid ${colors.default.background[100]}`,
  textAlign: "center",
  whiteSpace: "nowrap",
  selectors: {
    "&:first-child": {
      borderLeft: `2px solid ${colors.default.background[100]}`,
      borderTopLeftRadius: vars.border.radius,
      borderBottomLeftRadius: vars.border.radius,
    },
    "&:last-child": {
      borderRight: `2px solid ${colors.default.background[100]}`,
      borderTopRightRadius: vars.border.radius,
      borderBottomRightRadius: vars.border.radius,
    },
  },
})

export const tableCellSideHeadStyle = style({
  backgroundColor: colors.default.background[100],
})

// Actions innerhalb einer Zelle
export const tableCellActionStyle = style({
  display: "flex",
  alignItems: "center",
})

export const tableCellActionItemStyle = style({
  marginRight: "10px",
  selectors: {
    "&:last-child": {
      marginRight: "unset",
    },
  },
})

// Warnzeilen
export const tableRowWarningStyle = style({
  backgroundColor: "#FFFAEC",
  selectors: {
    "&:hover": {
      backgroundColor: "#f9f3df",
    },
  },
})

export const tableCellWarningStyle = style({
  borderColor: "#FFB800",
})

// Ausgewählte Zeilen
export const tableRowSelectedStyle = style({
  backgroundColor: "rgba(0, 123, 255, 0.15)",
})

export const tableCellSelectedStyle = style({
  borderTopColor: colors.default.primary[100],
  borderBottomColor: colors.default.primary[100],
  selectors: {
    "&:first-child": {
      borderLeftColor: colors.default.primary[100],
    },
    "&:last-child": {
      borderRightColor: colors.default.primary[100],
    },
  },
})
