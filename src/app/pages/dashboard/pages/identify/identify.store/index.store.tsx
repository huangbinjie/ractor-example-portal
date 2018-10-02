import { Store } from "ractor";
import { Save } from "@dashboard/Save";
import { Modal, message } from "antd";
import { ResetIdentify } from "@dashboard/pages/identify/identify.store/ResetIdentify";
import { IdentifyService } from "@dashboard/pages/identify/service";
import { GetIdentify } from "@dashboard/pages/identify/identify.store/GetIdentify";
import { UploadIdentify } from "@dashboard/pages/identify/identify.store/UploadIdentify";
import { I18n, translate } from "lib/ractor-i18n";
import { LanguageStore } from "@app/stores/language/language.store";
import { LanguageChanged } from "@app/stores/language/LanguageChanged";

export type IdentifyStoreState = {
  id: number,
  imgPath?: string,
  systemLanguage: string,
  hasChanged: boolean
}

const confirm = Modal.confirm;

export class IdentifyStore extends Store<IdentifyStoreState> {
  public state: IdentifyStoreState = {
    id: 0,
    systemLanguage: '',
    hasChanged: false
  }
  private identifyService = new IdentifyService()
  private i18n: I18n

  public preStart() {
    this.i18n = this.context.system.get(LanguageStore)!.getInstance().state.languagePackage!
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(LanguageChanged, ({ i18n }) => {
        this.i18n = i18n
      })
      .match(GetIdentify, async () => {
        const identify = await this.identifyService.getIdentify();
        this.setState({
          imgPath: identify.imgPath
        })
      })
      .match(UploadIdentify, ({ data, hasChanged }) => {
        this.setState({
          imgPath: data,
          hasChanged
        })
      })
      .match(Save, ({ key }) => {
        const that = this;
        if (key === '3' && this.state.hasChanged) {
          confirm({
            iconType: " ",
            title: translate("dashboard.identity.replace.content", this.i18n),
            okText: translate("common.ok", this.i18n),
            cancelText: translate("common.cancel", this.i18n),
            onOk: () => {
              that.identifyService.saveIdentify({
                imgPath: that.state.imgPath
              }).then(() => {
                that.setState({ hasChanged: false });
                message.success(translate("dashboard.identity.replace.success", this.i18n));
              }).catch(() => {
                message.error(translate("dashboard.identity.replace.failure", this.i18n));
              })
            },
            onCancel() {
              // console.log('Cancel');
            }
          });
        };
      })
      .match(ResetIdentify, () => {
        if (!this.state.imgPath) {
          return;
        }
        const that = this;
        confirm({
          title: translate("dashboard.identity.recovery.content", this.i18n),
          iconType: " ",
          okText: translate("common.ok", this.i18n),
          cancelText: translate("common.cancel", this.i18n),
          onOk: () => {
            that.identifyService.resetIdentify().then(() => {
              that.setState({ imgPath: '', hasChanged: true });
              message.success(translate("dashboard.identity.recovery.success", this.i18n));
            }).catch(() => {
              message.error(translate("dashboard.identity.recovery.failure", this.i18n));
            })
          },
          onCancel() {
            // console.log('Cancel');
          },
        });
      })
      .build()
  }
}