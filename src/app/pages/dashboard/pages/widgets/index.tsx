import * as React from 'react';
import * as style from '@dashboard/pages/widgets/index.style';
import { Checkbox } from 'antd';
import { Widget } from '@dashboard/components/widget'
import { WidgetStore, WidgetStoreState } from '@dashboard/pages/widgets/index.store'
import { Providers } from 'ractor-react';
import { system } from '@app/system/system';
import { SwitchAll } from '@dashboard/pages/widgets/SwitchAll';
import { GetWidgets } from '@dashboard/pages/widgets/GetWidgets';
import { Prompt } from 'react-router';
import { Trans, translate } from 'lib/ractor-i18n';
import { LanguageStore, LanguageStoreState } from '@app/stores/language/language.store';

@Providers([WidgetStore, LanguageStore])
export class Widgets extends React.Component<WidgetStoreState & LanguageStoreState> {
  public static defaultProps: WidgetStoreState & LanguageStoreState

  public componentDidMount() {
    setTimeout(() => {
      system.dispatch(new GetWidgets());
    }, 0)
  }

  public render() {
    return <div className={style.content}>
      <div>
        <Trans>dashboard.widgets.label</Trans>
        <Checkbox checked={this.props.switchAll} onChange={(e) => system.dispatch(new SwitchAll(e.target.checked))}><Trans>dashboard.widgets.selectAll</Trans></Checkbox>
      </div>
      <ul className={style.itemsWrap}>
        {this.props.widgets.map((item, index) => <Widget key={item.id} item={item} index={index} />)}
      </ul>
      <Prompt
        when={this.props.isEnabled}
        message={JSON.stringify({
          header: translate("dashboard.changePageTitle", this.props.languagePackage, { name: "Widget" }),
          main: translate("dashboard.changePageSubTitle", this.props.languagePackage)
        })} />
    </div>
  }
}
