import { Store } from "ractor";
import { SetMenus } from "@dashboard/pages/menu-config/menu-config.store/SetMenus";
import { AddMenuClicked } from "@dashboard/pages/menu-config/menu-config.store/AddMenuClicked";
import { ModalConfirmed } from "@dashboard/components/menu-modal/menu-modal.store/ModalConfirmed";
import { DeleteMenu } from "@dashboard/pages/menu-config/menu-config.store/DeleteMenu";
import { Modal, message } from "antd";
import { DeleteAllClicked } from "@dashboard/pages/menu-config/menu-config.store/DeleteAllClicked";
import { ResumeMenuClicked } from "@dashboard/pages/menu-config/menu-config.store/ResumeMenuClicked";
import { SetHomePage } from "@dashboard/pages/menu-config/menu-config.store/SetHomePage";
import { bfs } from "lib/bfs";
import { GetMenus } from "@dashboard/pages/menu-config/menu-config.store/GetMenus";
import { MenuService } from "@dashboard/services/menu.service";
import { Menu } from "@dashboard/types/Menu";
import { Save } from "@dashboard/Save";
import { ModifyMenuClicked } from "@dashboard/pages/menu-config/menu-config.store/ModifyMenuClicked";
import { LanguageStore } from "@app/stores/language/language.store";
import { LanguageChanged } from "@app/stores/language/LanguageChanged";
import { translate, I18n } from "lib/ractor-i18n";
import { MoveNode } from "@dashboard/pages/menu-config/menu-config.store/MoveNode";

export type MenuConfigStoreState = {
  copyOfMenus: Menu[]
  hasChanged: boolean
  menus: Menu[],
  processingInfo: {
    node: Menu | null
    path: number[]
  }
}

export class MenuConfigStore extends Store<MenuConfigStoreState> {
  public state: MenuConfigStoreState = {
    copyOfMenus: [],
    hasChanged: false,
    menus: [],
    processingInfo: {
      node: null,
      path: []
    }
  }
  private menuService = new MenuService
  private i18n: I18n

  public preStart() {
    this.i18n = this.context.system.get(LanguageStore)!.getInstance().state.languagePackage!
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(LanguageChanged, ({ i18n }) => {
        this.i18n = i18n
      })
      .match(GetMenus, async () => {
        const menus = await this.menuService.list()
        this.setState({ menus, copyOfMenus: JSON.parse(JSON.stringify(menus)) })
      })
      .match(SetMenus, ({ menus }) => {
        this.setState({ menus })
      })
      .match(MoveNode, () => {
        this.state.hasChanged = true
      })
      .match(ResumeMenuClicked, () => {
        Modal.confirm({
          iconType: " ",
          title: translate("dashboard.menuConfig.resumeModal.title", this.i18n),
          content: translate("dashboard.menuConfig.resumeModal.content", this.i18n),
          okText: translate("common.ok", this.i18n),
          cancelText: translate("common.cancel", this.i18n),
          onOk: async () => {
            const menus = await this.menuService.resume()
            this.setState({ menus, hasChanged: true })
          }
        })
      })
      .match([AddMenuClicked, ModifyMenuClicked], addMenu => {
        this.setState({ processingInfo: addMenu })
      })
      .match(DeleteAllClicked, () => {
        if (this.state.menus.length === 0) {
          return
        }
        Modal.confirm({
          iconType: " ",
          title: translate("dashboard.menuConfig.removeAllModal.title", this.i18n),
          content: translate("dashboard.menuConfig.removeAllModal.content", this.i18n),
          okText: translate("common.ok", this.i18n),
          cancelText: translate("common.cancel", this.i18n),
          onOk: async () => {
            this.setState({ menus: [], hasChanged: true })
          }
        })
      })
      .match(DeleteMenu, ({ menu, parentMenu }) => {
        const content = menu.children.length > 0 ? "dashboard.menuConfig.removeModal.title2" : "dashboard.menuConfig.removeModal.title1"
        Modal.confirm({
          iconType: " ",
          title: translate(content, this.i18n, { name: menu.name }),
          okText: translate("common.ok", this.i18n),
          cancelText: translate("common.cancel", this.i18n),
          onOk: () => {
            if (parentMenu) {
              const index = parentMenu.children.indexOf(menu)
              // 因为没有 id 无法找到菜单，利用引用类型处理
              // const nextParentMenu = bfs(this.createMenu(menus), "id", parentMenu.id)!
              parentMenu.children.splice(index, 1)
              this.setState({ menus: [...this.state.menus], hasChanged: true })
            } else {
              const menus = [...this.state.menus]
              const index = menus.indexOf(menu)
              menus.splice(index, 1)
              this.setState({ menus, hasChanged: true })
            }
          }
        });
      })
      .match(SetHomePage, ({ node }) => {
        const menus = this.createMenu(this.state.menus)
        // 找到之前的主页
        const homeMenu = bfs(menus, "isInitPage", true)
        if (homeMenu) {
          homeMenu.isInitPage = false
        }
        node.isInitPage = true
        this.setState({ menus: [...this.state.menus], hasChanged: true })
      })
      // 弹出的创建菜单，点击确定之后
      .match(ModalConfirmed, ({ type, menu }) => {
        if (menu === null) {
          return
        }
        if (type === "add") {
          // 加上 parentId
          menu = this.parseMenu(menu)
          if (this.state.processingInfo) {
            const nextMenus = [...this.state.menus]
            const path = this.state.processingInfo.path
            // path 长度为0表示在根节点，给第一个节点(根节点)push
            if (path.length === 0) {
              nextMenus.push(menu)
              this.setState({ menus: nextMenus, hasChanged: true })
            } else {
              // const parentNode = bfs(this.createMenu(nextMenus), "id", this.state.processingInfo.node!.id)!
              const parentNode = this.state.processingInfo.node
              if (parentNode) {
                parentNode.children.push(menu)
                this.setState({ menus: [...this.state.menus], hasChanged: true })
              }
            }
          }
        } else {
          // 修改菜单
          if (this.state.processingInfo) {
            if (this.state.processingInfo.node) {
              this.state.processingInfo.node.name = menu.name
              this.state.processingInfo.node.type = menu.type
              this.state.processingInfo.node.url = menu.url
              this.state.processingInfo.node.addition = menu.addition
              this.state.processingInfo.node.isInitPage = false
              this.state.processingInfo.node.code = menu.code
              this.setState({ menus: [...this.state.menus], hasChanged: true })
            }
          }
        }
      })
      .match(Save, async ({ key }) => {
        if (key === "1") {
          if (this.state.menus.length > 0) {
            const menuTree = this.createMenu(this.state.menus)
            // 找到之前的主页
            const homeMenu = bfs(menuTree, "isInitPage", true)
            if (!homeMenu) {
              Modal.warn({
                content: translate("dashboard.menuConfig.setHomeModal.content", this.i18n),
                okText: translate("dashboard.menuConfig.setHomeModal.ok", this.i18n),
              })
              return
            }
          }
          try {
            const menus = await this.menuService.save(this.state.menus) || []
            this.setState({ menus, hasChanged: false, copyOfMenus: JSON.parse(JSON.stringify(menus)) })
            message.success(translate("common.save.success", this.i18n))
          } catch {
            message.error(translate("common.save.failure", this.i18n))
          }
        }
      })
      .build()
  }

  // 创建虚拟根节点
  private createMenu(menus: Menu[]): Menu {
    return { id: -1, children: this.state.menus } as Menu
  }

  // 菜单的数据类型是 {id, name, url, addition}，所以要转成正常的菜单
  private parseMenu = (menu: Menu): Menu => {
    delete menu.id
    return {
      children: [],
      ...menu,
      isInitPage: false,
      parentId: this.state.processingInfo!.node ? this.state.processingInfo!.node!.id! : 0
    }
  }
}
