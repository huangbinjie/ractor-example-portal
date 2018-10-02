import * as React from 'react';
import { Providers, Provider } from "ractor-react";
import { Tabs, Button, Modal } from "antd";
import * as style from '@dashboard/dashboard.style';
import { LanguageStore, LanguageStoreState } from '@app/stores/language/language.store';
import { Widgets } from '@dashboard/pages/widgets';
import { Identify } from '@dashboard/pages/identify';
import { MenuConfig } from '@dashboard/pages/menu-config/menu-config';
import { system } from '@app/system/system';
import { Save } from '@dashboard/Save'
import { PermissionStore, PermissionStoreState } from '@app/stores/permission/permission.store';
import { WidgetStore } from '@dashboard/pages/widgets/index.store';
import { MenuConfigStore } from '@dashboard/pages/menu-config/menu-config.store/menu-config.store';
import { translate } from 'lib/ractor-i18n';

type Props = LanguageStoreState & PermissionStoreState

@Providers([LanguageStore, PermissionStore])
export default class Dashboard extends React.Component<Props> {
  public state = {
    current: '1'
  }
  public componentDidMount() {
    if (this.getPromission('systemConfiguration.interface.menu')) {
      this.setState({
        current: '1'
      })
      return;
    }

    if (this.getPromission('systemConfiguration.interface.widget')) {
      this.setState({
        current: '2'
      })
      return;
    }

    if (this.getPromission('systemConfiguration.interface.corporation')) {
      this.setState({
        current: '3'
      })
      return;
    }
  }

  public getPromission(code: string) {
    return this.props.permissions.some(item => item.code === code);
  }

  public activeTabs(key: string) {
    if (system.get(WidgetStore)!.getInstance && system.get(WidgetStore)!.getInstance().state.isEnabled) {
      this.setState({ current: this.state.current });
      Modal.confirm({
        iconType: " ",
        title: translate("dashboard.changePageTitle", this.props.languagePackage, { name: "Widget" }),
        content: translate("dashboard.changePageSubTitle", this.props.languagePackage, { name: "Widget" }),
        okText: this.props.languagePackage["common.ok"],
        cancelText: this.props.languagePackage["common.cancel"],
        onOk: () => {
          this.setState({ current: key });
          system.get(WidgetStore)!.getInstance().setState({ isEnabled: false });
        }
      })
      return
    }
    const menuConfigStore = system.get(MenuConfigStore)!.getInstance()
    if (menuConfigStore.state.hasChanged) {
      this.setState({ current: this.state.current });
      Modal.confirm({
        iconType: " ",
        title: translate("dashboard.changePageTitle", this.props.languagePackage, { name: "菜单" }),
        content: translate("dashboard.changePageSubTitle", this.props.languagePackage, { name: "菜单" }),
        okText: this.props.languagePackage["common.ok"],
        cancelText: this.props.languagePackage["common.cancel"],
        onOk: () => {
          this.setState({ current: key });
          menuConfigStore.setState({ hasChanged: false, menus: menuConfigStore.state.copyOfMenus })
        }
      })
      return
    }

    this.setState({ current: key });
  }

  public render() {
    return (
      <Provider system={system} stores={[WidgetStore]}>
        <div className={style.tabs}>
          <Tabs animated={false} defaultActiveKey={this.state.current} activeKey={this.state.current} size={'default'} onChange={(activeKey) => this.activeTabs(activeKey)}>
            {this.getPromission('systemConfiguration.interface.menu') ? <Tabs.TabPane tab={this.props.languagePackage["dashboard.menuConfig.tab"]} key="1">
              <MenuConfig />
            </Tabs.TabPane> : ''}
            {this.getPromission('systemConfiguration.interface.widget') ? <Tabs.TabPane tab={this.props.languagePackage["dashboard.widgets.tab"]} key="2">
              <Widgets />
            </Tabs.TabPane> : ''}
            {this.getPromission('systemConfiguration.interface.corporation') ? <Tabs.TabPane tab={this.props.languagePackage["dashboard.identity.tab"]} key="3">
              <Identify />
            </Tabs.TabPane> : ''}
          </Tabs>
          <Button className={style.active} type='primary' onClick={() => system.dispatch(new Save(this.state.current))}>保存</Button>
        </div>
      </Provider>
    );
  }
}
