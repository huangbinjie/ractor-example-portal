import { Menu } from "@dashboard/types/Menu";

export class ModifyMenuClicked {
  constructor(public node: Menu, public path: number[]) { }
}