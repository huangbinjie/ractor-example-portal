import { Identify } from "@dashboard/types/Identity";
import { DashboardService } from "@dashboard/services/dashboard.service";

export class IdentifyService extends DashboardService {

  public getIdentify(): Promise<Identify> {
    return super.get('/corporation')
  }

  public saveIdentify(params: object) {
    return super.put('/corporation', params);
  }

  public resetIdentify() {
    return super.put('/corporation/resume');
  }
}