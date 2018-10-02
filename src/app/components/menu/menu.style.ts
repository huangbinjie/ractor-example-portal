import { style } from "typestyle/lib"

export const menu = style({
    flexShrink: 0,
    height: "auto",
    width: "220px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    whiteSpace: "nowrap",
    borderRight: "1px solid #ccc",
    transition: "all 0.3s ease-in-out",
    background: "#333333",
    color: "#ffffff"
})

export const logo = style({
    padding: "14px 0 14px 15px",
    fontSize: "19px",
    color: "#ffffff"
})

export const header = style({
    height: "48px",
    fontSize: "14px",
    userSelect: "none",
    borderBottom: "1px solid #e8e8e8",
})

export const menuWrap = style({
    height: 'calc(100vh - 68px)',
    overflow: 'auto'
})

export const fff = style({
    color: '#ffffff !important'
})