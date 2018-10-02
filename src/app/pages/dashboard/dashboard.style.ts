import { style } from "typestyle/lib"

export const tabs = style({
  width: "100%",
  fontSize: "20px",
  borderBottom: "1px solid #f1f1f1",
  backgroundColor: "#F5F5F5",
  position: 'relative' 
});

export const active = style({
  position: 'absolute',
  top: '12px',
  right: '20px',
  width: '60px',
  height: '30px',
  padding: '0 10px'
})