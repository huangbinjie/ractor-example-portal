import * as React from 'react';
import * as style from "@components/menu/menu.style"
import { Connect } from 'ractor-react';
import { Menu as AntdMenu } from 'antd';
import { MenuStore, MenuState } from '@components/menu/menu.store';
import { Menu as MenuType } from './menu.type';
import { Trans } from 'lib/ractor-i18n/Trans';

@Connect(MenuStore)
export class Menu extends React.Component<MenuState> {
  public static defaultProps: MenuState
  public generateNestMenus(menu: MenuType): React.ReactNode {
    if (!menu.children || !menu.children.length) {
      return (
        <AntdMenu.Item key={menu.id}>{menu.name}</AntdMenu.Item>
      );
    }

    const subMenuTitle = menu.name;

    return (
      <AntdMenu.SubMenu key={menu.id}
        title={subMenuTitle}
      >
        {menu.children.map(item => this.generateNestMenus(item))}
      </AntdMenu.SubMenu>
    );
  }

  public render() {
    return (
      <div className={style.menu} style={{ width: this.props.isOpen ? '220px' : '0' }}>
        <h1 className={style.logo}><Trans>app.menu.logo</Trans></h1>
        <div className={style.menuWrap}>
          <AntdMenu defaultSelectedKeys={['0']} defaultOpenKeys={['sub1']} inlineIndent={15} mode='inline'>
            <AntdMenu.Item key='0'><a className={style.fff} href='#/system-dashboard'><Trans>app.menu.userConfig</Trans></a></AntdMenu.Item>
          </AntdMenu>
        </div>
      </div>
    )
  }
}