import * as React from "react";
import { Modal, Radio, Input } from "antd";
import { Connect } from "ractor-react";
import { MenuModalStoreState, MenuModalStore } from "@dashboard/components/menu-modal/menu-modal.store/menu-modal.store";
import { system } from "@app/system/system";
import { CloseMenuModal } from "@dashboard/components/menu-modal/menu-modal.store/CloseMenuModal";
import { ModalConfirmed } from "@dashboard/components/menu-modal/menu-modal.store/ModalConfirmed";

import * as styles from "./menu-modal.style"
import { SearchMenus } from "@dashboard/components/menu-modal/menu-modal.store/SearchMenus";
import { Menu } from "@dashboard/types/Menu";
import { ToggleDisplay } from "@dashboard/components/menu-modal/menu-modal.store/ToggleDisplay";
import { SetProcessingMenu } from "@dashboard/components/menu-modal/menu-modal.store/SetProcessingMenu";
import { ChangeSearchValue } from "@dashboard/components/menu-modal/menu-modal.store/ChangeSearchValue";

@Connect(MenuModalStore)
export class MenuModal extends React.Component<Partial<MenuModalStoreState>> {
  public render() {
    const { processingMenu } = this.props
    return (
      <Modal
        title={this.props.title}
        visible={this.props.visible}
        okText="确定"
        cancelText="取消"
        onOk={this.onOk}
        onCancel={this.onCancel}
        okButtonProps={{ disabled: processingMenu ? processingMenu.name === "" ? true : false : true }}
      >
        <section className={styles.header} onChange={e => system.dispatch(new ToggleDisplay((e.target as HTMLInputElement).value))}>
          <Radio.Group value={this.props.display}>
            <Radio value="page">页面菜单</Radio>
            <Radio value="classic">分类菜单</Radio>
          </Radio.Group>
        </section>
        <section className={styles.pageMenuContent} style={{ display: this.props.display === "page" ? "block" : "none" }}>
          <Input.Search placeholder="搜索菜单" value={this.props.searchValue} onChange={e => system.dispatch(new ChangeSearchValue(e.target.value))} onSearch={this.onSearch} />
          <div style={{ marginTop: "20px" }}>
            <Radio.Group value={processingMenu ? processingMenu.code : null} onChange={e => system.dispatch(new SetProcessingMenu(this.parsePageMenu(e.target.value)))}>
              {this.props.filteredMenus!.map((menu, index) => {
                return (
                  <div key={index} style={{ marginBottom: index === this.props.filteredMenus!.length - 1 ? "0" : "20px" }}>
                    <Radio value={menu.code}>{menu.name} {menu.url}</Radio>
                  </div>
                )
              })}
            </Radio.Group>
          </div>
        </section>
        <section className={styles.classicMenuContent} style={{ display: this.props.display === "page" ? "none" : "block" }}>
          分类名称：
          <Input
            value={this.props.processingMenu ? this.props.processingMenu.name : ""}
            onChange={e => system.dispatch(new SetProcessingMenu(this.createClassicMenu(e.target.value)))}
            maxLength={30}
          />
        </section>
      </Modal>
    )
  }

  private onCancel = () => {
    system.dispatch(new CloseMenuModal)
  }

  private onOk = () => {
    const type = this.props.title === "修改菜单" ? "modify" : "add"
    system.dispatch(new ModalConfirmed(type, this.props.processingMenu!))
  }

  private onSearch = (value: string) => {
    system.dispatch(new SearchMenus(value))
  }

  private parsePageMenu(code: string) {
    const menu = this.props.pageMenus!.find(m => m.code === code)!
    menu.type = "pageMenu"
    return menu
  }

  private createClassicMenu(name: string): Menu {
    return new Menu(name)
  }
}