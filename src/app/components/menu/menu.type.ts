export class Menu {
  public id?: number
  public type = "ClassifiedMenu"
  public isInitPage = false
  public parentId = 0
  public url?: string
  public children: Menu[] = []
  constructor(public name: string) { }
}