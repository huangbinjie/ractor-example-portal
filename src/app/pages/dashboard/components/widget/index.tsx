import * as React from 'react';
import * as style from '@dashboard/components/widget/index.style';
import { Checkbox } from 'antd';
import { Widget as WidgetType } from '@dashboard/components/widget/index.type';
import { system } from '@app/system/system';
import { ToggleStatus } from '@dashboard/pages/widgets/ToggleStatus';

type Props = {
  item: WidgetType,
  index: number
}
export class Widget extends React.Component<Props> {
  public sliceContent(content: string) {
    if (content.length > 35) {
      content = content.substr(0, 35) + '...';
    }
    return content;
  }
  public render() {
    return <li className={style.container} onClick={() => system.dispatch(new ToggleStatus(this.props.index))}>
      <div className={style.thumbnail}>
        <img className={style.imgBox} src={this.props.item.image ? this.props.item.image : require('./widget-default.jpg')} />
      </div>
      <div className={style.name}>{this.props.item.name}</div>
      <div className={style.clientName}>{this.props.item.clientName}</div>
      <div className={style.description} title={this.props.item.description}>
        <span>{this.sliceContent(this.props.item.description)}</span>
      </div>
      <Checkbox className={style.checkout} checked={this.props.item.enabled} onChange={() => system.dispatch(new ToggleStatus(this.props.index))} />
    </li>
  }
}