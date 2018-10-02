import { AppService } from "@app/services/app.service";
import * as qs from 'qs';

export class AppRevokeService extends AppService {
  public revokeApp(data: object): Promise<''> {
    return super.post("/oauth/revoke", qs.stringify(data), {
      "Content-Type": "application/x-www-form-urlencoded"
    })
  }
}