import * as React from 'react';
import { Modal, Button } from 'antd'
import { Connect } from 'ractor-react';
import environment from "@environment";
import { InterceptorsStore, InterceptorsState } from '@components/interceptors/index.store';
import { Kickout } from './kickout';
import { Timeout } from './timeout';

@Connect(InterceptorsStore)
export class InterceptorsModal extends React.Component<Partial<InterceptorsState>>{
  public render() {
    const buttons = [<Button key="buttons" type="primary" onClick={() => { location.href = environment.loginUrl }}>确定</Button>]
    return (
      <Modal
        visible={this.props.visible}
        keyboard={false}
        closable={false}
        maskClosable={false}
        width={480}
        title={this.props.title}
        footer={buttons}
        wrapClassName="portal-modal"
      >
        {this.props.status === 'kickedout' ? <Kickout /> : <Timeout />}
      </Modal>
    )
  }
}