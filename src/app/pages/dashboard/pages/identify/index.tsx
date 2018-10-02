import * as React from 'react';
import { Button, Upload, message } from 'antd';
import { system } from '@app/system/system';
import { Connect } from 'ractor-react';

import * as style from '@dashboard/pages/identify/index.style';
import { ResetIdentify } from '@dashboard/pages/identify/identify.store/ResetIdentify';
import { IdentifyStore, IdentifyStoreState } from '@dashboard/pages/identify/identify.store/index.store';
import env from '@environment';
import { GetIdentify } from '@dashboard/pages/identify/identify.store/GetIdentify';
import { TokenStore } from "@app/stores/token/token.store";
import { UploadIdentify } from '@dashboard/pages/identify/identify.store/UploadIdentify';
import { ShowModel } from "@components/interceptors/ShowModel";
import LogoImage from './logo';
import { Trans, translate } from 'lib/ractor-i18n';
import { LanguageStore } from '@app/stores/language/language.store';

const props = {
  name: 'file',
  action: env.domain + env.baseUrl["system-configuration"] + '/corporation/upload',
  headers: {
    Authorization: 'Bearer ' + system.get(TokenStore)!.getInstance().state.token!.access_token
  },
  accept: '.png,.jpg,.jpeg,.gif',
  showUploadList: false,
  onChange(info: any) {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    const i18n = system.get(LanguageStore)!.getInstance().state.languagePackage

    if (info.file.status === 'done') {
      message.success(translate("dashboard.identity.upload.success", i18n, { filename: info.file.name }));
      system.dispatch(new UploadIdentify(info.file.response.imgPath, true));
    } else if (info.file.status === 'error') {
      if (info.file.error.status === 401) {
        if (info.file.response.code === 'kicked_out') {
          system.dispatch(new ShowModel('kickedout'));
        } else {
          system.dispatch(new ShowModel('timeout'));
        }
      } else {
        message.success(translate("dashboard.identity.upload.failure", i18n, { filename: info.file.name }));
      }
    }
  }
};

@Connect(IdentifyStore)
export class Identify extends React.Component<IdentifyStoreState> {
  public static defaultProps: IdentifyStoreState
  public componentDidMount() {
    setTimeout(() => {
      system.dispatch(new GetIdentify());
    }, 0)
  }

  public render() {
    return <div className={style.wrap}>
      <div>
        <div className={style.logo}>
          {this.props.imgPath ? <LogoImage maxHeight={64} maxWidth={220} src={this.props.imgPath} /> : <img className={style.img} src={require('./logo.png')} />}
        </div>
        <Upload {...props}>
          <Button className={style.button} type='primary'><Trans>dashboard.identity.button</Trans></Button>
        </Upload>
        <a className={this.props.imgPath ? style.reset : style.disabledReset} href='javascript:;' onClick={() => system.dispatch(new ResetIdentify())}><Trans>dashboard.identity.recovery</Trans></a>
      </div>
    </div>
  }
}
