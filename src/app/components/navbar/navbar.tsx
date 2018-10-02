import * as React from "react";
import * as style from "@components/navbar/navbar.style"
import { system } from "@app/system/system";
import { ToggleMenu } from "@components/menu/ToggleMenu";
import { Dropdown, Menu, Modal } from "antd";
import AvatarIcon from 'ep-icons/react/Avatar';
import { Providers } from "ractor-react";
import { UserStore, UserState } from "@app/stores/user/user.store";
import { AppRevokeService } from "@app/services/app-revoke.service";
import { TokenStore } from "@app/stores/token/token.store";
import environment from "@environment";
import { Trans, translate } from "lib/ractor-i18n";
import { LanguageStore } from "@app/stores/language/language.store";

const confirm = Modal.confirm;
@Providers([UserStore])
export class Navbar extends React.Component<Partial<UserState>> {
  public render() {
    return (
      <div className={style.header}>
        <div className={style.menuControl} onClick={() => system.dispatch(new ToggleMenu)}>
          <i className="ep-iconfont icon-menu" />
        </div>
        <Dropdown overlay={user()}>
          <div className={style.userZone}>
            <AvatarIcon className={style.icon} />
            <span>{this.props.user && this.props.user!.realname}</span>
          </div>
        </Dropdown>
      </div>
    )
  }
}

function askLoginOut() {
  const token = system.get(TokenStore)!.getInstance().state.token!.access_token;
  const i18n = system.get(LanguageStore)!.getInstance().state.languagePackage
  confirm({
    iconType: " ",
    title: <Trans i18n={i18n}>app.nav.logoutModal.title</Trans>,
    content: <Trans i18n={i18n}>app.nav.logoutModal.content</Trans>,
    okText: translate("common.ok", i18n),
    cancelText: translate("common.cancel", i18n),
    onOk() {
      new AppRevokeService().revokeApp({ token }).then(() => {
        location.href = environment.loginUrl
      });
    }
  });
}

function user() {
  return (
    <Menu onClick={() => askLoginOut()}>
      <Menu.Item key="3">
        <i className="ep-iconfont icon-logout" style={{ marginRight: "4px" }} />
        <span><Trans>app.nav.logout</Trans></span>
      </Menu.Item>
    </Menu>
  )
}