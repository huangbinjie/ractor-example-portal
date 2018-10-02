import { Menu } from "@dashboard/types/Menu";

export class AddMenuClicked {
  constructor(public node: Menu | null, public path: number[]) { }
}