import { style } from 'typestyle/lib';

export const container = style({
  width: '280px',
  height: '306px',
  margin: '0 20px 20px 0',
  padding: '10px',
  position: 'relative',
  boxSizing: "border-box",
  backgroundColor: '#ffffff',
  cursor: 'pointer'
});

export const thumbnail = style({
  width: 'auto',
  height: '175px',
  border: '1px solid #E8E8E8',
  backgroundColor: '#FAFAFA'
});

export const imgBox = style({
  width: '100%',
  height: '100%'
});

export const checkout = style({
  position: 'absolute',
  right: '10px',
  top: '7px'
})

export const name = style({
  color: '#333333',
  fontWeight: 'bold',
  margin: '10px 0 5px 0',
  fontSize: '16px'
});

export const clientName = style({
  color: '#999999',
  fontSize: '14px'
});

export const description = style({
  position: 'relative',
  color: '#333333',
  fontSize: '14px',
  marginTop: '5px',
  maxHeight: '45px',
  overflow: 'hidden'
});
