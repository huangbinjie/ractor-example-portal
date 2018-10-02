import classes from './index.scss';
import * as React from 'react';
import TimeoutIcon from 'ep-icons/react/Timeout';

export class Timeout extends React.Component{
   render() {

    // const { mainDescription, subDescription } = this.props.theme.i18n.LoginModal.Timeout;
    const { mainDescription, subDescription } = {
      mainDescription: '登录超时',
      subDescription: '请重新登录或者安全退出'
    } 
    return (
      <div className={classes.container}>
        <TimeoutIcon className={classes.icon} />
        <h3 className={classes.h}>{mainDescription}</h3>
        <p className={classes.desc}>{subDescription}</p>
      </div>
    );
  }
}
