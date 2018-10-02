import { AppService } from "@app/services/app.service";
import { AppPermission } from "@app/types/Permission";

export class AppPermissionService extends AppService {
  public getPermission(): Promise<AppPermission[]> {
    return super.get("/account/funcPermissions")
  }
}