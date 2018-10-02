import { style } from 'typestyle/lib';

export const wrap= style({
  margin: '0 20px',
  position: 'relative'
});

export const logo = style({
  width: '376px',
  height: '64px',
  padding: '0 78px',
  background: '#E8E8E8',
  margin: '10px 0 20px 0',
  textAlign: "center"
});

export const button = style ({
  width: '60px',
  padding: '0 10px'
})

export const img = style({
  width: '220px',
  height: '64px'
})

export const change = style({
  width: '60px',
  marginRight: '20px'
});

export const reset = style({
  color: '#333333',
  position: 'absolute',
  top: '90px',
  left: '80px'
});

export const disabledReset = style({
  color: '#C9C9C9',
  position: 'absolute',
  top: '90px',
  left: '80px',
  $nest: {
    '&:hover': {
      color: '#C9C9C9'
    }
  }
})