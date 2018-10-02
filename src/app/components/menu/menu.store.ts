import { Store } from "ractor";
import { Menu } from "@components/menu/menu.type";
import { ToggleMenu } from "@components/menu/ToggleMenu";
import { UpdateMenu } from "@components/menu/UpdateMenu";

export type MenuState = {
  isOpen: boolean,
  menus: Menu[]
}

export class MenuStore extends Store<MenuState> {
  public state: MenuState = {
    isOpen: true,
    menus: []
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(ToggleMenu, () => {
        const isOpen = !this.state.isOpen
        this.setState({ isOpen })
      })
      .match(UpdateMenu, ({ data }) => {
        this.setState({ menus: data });
      })
      .build()
  }
}