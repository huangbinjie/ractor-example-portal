import classes from './index.scss';
import * as React from 'react';
import AvatarIcon from 'ep-icons/react/Avatar';


export class Kickout extends React.Component {
   render() {

    // const { mainDescription, subDescription } = this.props.theme.i18n.LoginModal.Kickout;
    const { mainDescription, subDescription } = {
      mainDescription: '你的账号已在其他地方登录',
      subDescription: '请重新登录或者安全退出'
    }
    return (
      <div className={classes.container}>
        <AvatarIcon className={classes.icon} />
        <h3 className={classes.h}>{mainDescription}</h3>
        <p className={classes.desc}>{subDescription}</p>
      </div>
    );
  }
}
