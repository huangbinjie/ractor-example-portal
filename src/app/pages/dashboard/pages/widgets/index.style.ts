import { style } from 'typestyle/lib';

export const content = style({
  padding: '4px 20px 20px 20px',
  color: '#333333',
  height: 'calc(100vh - 100px)',
  overflow: 'auto'
})

export const itemsWrap = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  margin: '20px 0 0 0'
})

export const item = style({
  width: '280px',
  height: '306px',
  margin: '0 20px 20px 0',
  backgroundColor: '#ffffff'
})