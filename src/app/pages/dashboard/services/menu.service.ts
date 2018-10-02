import { DashboardService } from "@dashboard/services/dashboard.service";
import { Menu } from "@dashboard/types/Menu";

export class MenuService extends DashboardService {
  public list(): Promise<Menu[]> {
    return this.get("/menu/list")
  }

  public resume(): Promise<Menu[]> {
    return this.put("/menu/resume")
  }

  public save(menus: Menu[]): Promise<Menu[]> {
    return this.put("/menu/batch", menus)
  }

  public deleteAll(): Promise<Menu[]> {
    return this.put("/menu/batch", [])
  }

  public getAllOfRegistered(): Promise<Menu[]> {
    return this.get("/menu/register/all")
  }
}