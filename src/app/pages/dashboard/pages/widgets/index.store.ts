import { Store } from 'ractor';
import { Widget } from '@dashboard/components/widget/index.type';
import { ToggleStatus } from '@dashboard/pages/widgets/ToggleStatus';
import { SwitchAll } from '@dashboard/pages/widgets/SwitchAll';
import { Save } from '@dashboard/Save';
import { GetWidgets } from '@dashboard/pages/widgets/GetWidgets';
import { WidgetService } from '@dashboard/pages/widgets/service';
import { message } from 'antd';
import { I18n, translate } from 'lib/ractor-i18n';
import { LanguageStore } from '@app/stores/language/language.store';
import { LanguageChanged } from '@app/stores/language/LanguageChanged';


export type WidgetStoreState = {
  isEnabled: boolean,
  switchAll: boolean,
  widgets: Widget[]
}
export class WidgetStore extends Store<WidgetStoreState> {
  public state: WidgetStoreState = {
    isEnabled: false,
    switchAll: false,
    widgets: []
  }
  private widgetService = new WidgetService
  private i18n: I18n

  public preStart() {
    this.i18n = this.context.system.get(LanguageStore)!.getInstance().state.languagePackage!
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(LanguageChanged, ({ i18n }) => {
        this.i18n = i18n
      })
      .match(GetWidgets, async () => {
        try {
          const widgets = await this.widgetService.getWidgets();
          let switchAll = false;
          const checkedLength = widgets && widgets.filter(item => item.enabled).length;
          if (widgets.length && checkedLength === widgets.length) {
            switchAll = true
          };
          this.setState({
            widgets,
            switchAll
          });
        } catch {
          // TODO: dispatch to message store
        }

      })
      .match(SwitchAll, ({ status }) => {
        const widgets = [...this.state.widgets]
        widgets.forEach(item => item.enabled = status)
        this.setState({ widgets, switchAll: status, isEnabled: true })
      })
      .match(ToggleStatus, ({ index }) => {
        const widgets = [...this.state.widgets];
        let switchAll = false;
        widgets[index].enabled = !widgets[index].enabled;
        const checkedLength = widgets.filter(item => item.enabled).length;
        (checkedLength === widgets.length) && (switchAll = true);
        this.setState({ widgets, switchAll, isEnabled: true });
      })
      .match(Save, ({ key }) => {
        if (key === '2') {
          this.widgetService.saveWidgets(this.state.widgets).then(() => {
            this.setState({ isEnabled: false });
            message.success(translate("common.save.success", this.i18n))
          }).catch(() => message.error(translate("common.save.failure", this.i18n)))
        };
      })
      .build()
  }
}
