import { style } from "../../../../../../node_modules/typestyle/lib";

export const header = style({
  paddingBottom: "20px",
  borderBottom: "1px solid #e8e8e8"
})

export const pageMenuContent = style({
  paddingTop: "10px",
  $nest: {
    "& > div": {
      width: "100%",
      height: "158px",
      overflow: "auto"
    }
  }
})

export const classicMenuContent = style({
  paddingTop: "10px",
  height: "200px"
})