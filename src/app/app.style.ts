import { style } from "typestyle/lib";

export const app = style({
  display: "flex",
  height: "100vh",
  width: "100vw"
})

export const main = style({
  display: "flex",
  flexDirection: "column",
  flex: 1
})

export const container = style({
  $debugName: "container",
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between"
})