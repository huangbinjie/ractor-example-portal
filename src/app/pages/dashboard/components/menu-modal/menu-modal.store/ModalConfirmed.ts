import { Menu } from "@dashboard/types/Menu";

export class ModalConfirmed {
  constructor(public type: "modify" | "add", public menu: Menu | null) { }
}