import { style, cssRule } from "typestyle/lib";

cssRule(".ReactVirtualized__Grid", {
  outline: "none"
})

export const menuConfig = style({
  $debugName: "menu_config",
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 133px)",
  margin: "10px 20px 20px 20px",
  paddingBottom: "20px",
  background: "#fff"
})

export const tree = style({
  outline: "none"
})

export const control = style({
  padding: "20px"
})

export const controlMenu = style({
  marginRight: "20px",
  $nest: {
    "i": {
      marginRight: "3px"
    }
  }
})

export const treeArea = style({
  flex: 1
})

export const addMenu = style({
  width: "560px",
  marginLeft: "30px",
  marginBottom: "4px",
  padding: "12px 20px",
  color: "#1EA084",
  cursor: "pointer",
  border: "1px solid #D9D9D9"
})

