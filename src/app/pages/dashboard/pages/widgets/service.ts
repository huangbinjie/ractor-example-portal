import { Widget } from "@dashboard/components/widget/index.type";
import { DashboardService } from "@dashboard/services/dashboard.service";

export class WidgetService extends DashboardService {
  public getWidgets(): Promise<Widget[]> {
    return super.get('/widget/config/list')
  }

  public saveWidgets(params: Widget[]) {
    return super.post('/widget/config', params)
  }
}
