import { Store } from "ractor";
import { CloseMenuModal } from "@dashboard/components/menu-modal/menu-modal.store/CloseMenuModal";
import { AddMenuClicked } from "@dashboard/pages/menu-config/menu-config.store/AddMenuClicked";
import { ModalConfirmed } from "@dashboard/components/menu-modal/menu-modal.store/ModalConfirmed";
import { MenuService } from "@dashboard/services/menu.service";
import { SearchMenus } from "@dashboard/components/menu-modal/menu-modal.store/SearchMenus";
import { Menu } from "@dashboard/types/Menu";
import { GetAllRegisteredMenus } from "@dashboard/components/menu-modal/menu-modal.store/GetAllRegisteredMenus";
import { ModifyMenuClicked } from "@dashboard/pages/menu-config/menu-config.store/ModifyMenuClicked";
import { ToggleDisplay } from "@dashboard/components/menu-modal/menu-modal.store/ToggleDisplay";
import { SetProcessingMenu } from "@dashboard/components/menu-modal/menu-modal.store/SetProcessingMenu";
import { ChangeSearchValue } from "@dashboard/components/menu-modal/menu-modal.store/ChangeSearchValue";

export type MenuModalStoreState = {
  pageMenus: Menu[]
  filteredMenus: Menu[]
  title: string
  visible: boolean,
  display: string
  disabled: boolean
  processingMenu: Menu | null
  searchValue: string
}
export class MenuModalStore extends Store<MenuModalStoreState> {
  public state: MenuModalStoreState = {
    pageMenus: [],
    filteredMenus: [],
    title: "添加菜单",
    visible: false,
    display: "page",
    disabled: false,
    processingMenu: null,
    searchValue: ""
  }
  private menuService = new MenuService

  public createReceive() {
    return this.receiveBuilder()
      .match(GetAllRegisteredMenus, async () => {
        const pageMenus = await this.menuService.getAllOfRegistered()
        this.setState({ pageMenus, filteredMenus: pageMenus })
      })
      .match(ChangeSearchValue, ({ name }) => {
        this.setState({ searchValue: name })
      })
      .match(AddMenuClicked, async () => {
        const pageMenus = await this.menuService.getAllOfRegistered()
        this.setState({ visible: true, title: "添加菜单", pageMenus, filteredMenus: pageMenus, disabled: false })
      })
      .match(ModifyMenuClicked, async ({ node: menu }) => {
        this.setState({
          visible: true,
          title: "修改菜单",
          processingMenu: menu,
          pageMenus: [],
          disabled: true,
          searchValue: "",
          display: menu.type === "pageMenu" ? "page" : "classic"
        })
        const pageMenus = await this.menuService.getAllOfRegistered()
        if (menu.type === "pageMenu") {
          const selectedMenu = pageMenus.find(m => m.code === menu.code)!
          pageMenus.splice(pageMenus.indexOf(selectedMenu), 1)
          pageMenus.unshift(selectedMenu)
          this.setState({ pageMenus, filteredMenus: [...pageMenus] })
        } else {
          this.setState({ pageMenus })
        }
      })
      .match(CloseMenuModal, () => {
        this.setState({ visible: false, searchValue: "", processingMenu: null, display: "page" })
      })
      .match(ModalConfirmed, () => {
        this.context.system.dispatch(new CloseMenuModal)
      })
      .match(SearchMenus, ({ value }) => {
        const filteredMenus = this.state.pageMenus.filter(menu => menu.name.indexOf(value) > -1)
        this.setState({ filteredMenus })
      })
      .match(ToggleDisplay, ({ display }) => {
        this.setState({ display, processingMenu: null })
      })
      .match(SetProcessingMenu, ({ menu }) => {
        this.setState({ processingMenu: menu })
      })
      .build()
  }
}