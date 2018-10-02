import { Menu } from "@dashboard/types/Menu";

export class DeleteMenu {
  constructor(public menu: Menu, public parentMenu: Menu | null) { }
}