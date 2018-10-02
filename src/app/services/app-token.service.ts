import { AppService } from "@app/services/app.service";
import { AppToken } from "@app/types/Token";

export class AppTokenService extends AppService {
  public refresh(refreshToken: string): Promise<AppToken> {
    return this.post("/credentials/refresh", { grant_type: "refresh_token", refresh_token: refreshToken })
  }
}