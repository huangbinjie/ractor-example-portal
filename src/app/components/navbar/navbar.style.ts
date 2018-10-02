import { style } from "typestyle/lib"

export const header = style({
  $debugName: "navbar",
  display: "flex",
  justifyContent: "space-between",
  height: "48px",
  fontSize: "14px",
  borderBottom: "1px solid #f1f1f1"
})

export const menuControl = style({
  width: "30px",
  height: "40px",
  margin: "4px 10px",
  textAlign: "center",
  lineHeight: "40px",
  cursor: "pointer",
  fontSize: "20px"
})

export const userZone = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 10px",
  marginRight: "13px",
  userSelect: "none",
  $nest: {
    "&:hover": {
      background: "#f1f1f1"
    }
  }
})

export const icon = style({
  fontSize: '24px',
  marginRight: '5px'
})