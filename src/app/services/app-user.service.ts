import { AppService } from "@app/services/app.service";
import { AppUser } from "@app/types/User";

export class AppUserService extends AppService {
  public getUserInfo(): Promise<AppUser> {
    return super.get("/account/userInfo")
  }
}