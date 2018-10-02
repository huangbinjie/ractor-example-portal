import { AppService } from "@app/services/app.service";
import environment from "@environment";

export class DashboardService extends AppService {
  protected processUrl(url: string) {
    return environment.domain + environment.baseUrl["system-configuration"] + url
  }

  protected get(url: string, headers?: object) {
    return super.get(url, headers).then(response => response)
  }

  protected post(url: string, body?: any, headers?: object) {
    return super.post(url, body, headers).then(response => response)
  }

  protected put(url: string, body?: any, headers?: object) {
    return super.put(url, body, headers).then(response => response)
  }

  protected delete(url: string, headers?: object) {
    return super.delete(url, headers).then(response => response)
  }
}