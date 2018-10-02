import { createHistoryStore } from "react-router-ractor"
import createHashHistory from "history/createHashHistory"
import { Modal } from "antd";
import { translate } from "lib/ractor-i18n";
import { system } from "@app/system/system";
import { LanguageStore } from "@app/stores/language/language.store";

export const history = createHashHistory({
  getUserConfirmation(message, callback) {
    const parsedMessage = JSON.parse(message)
    const i18n = system.get(LanguageStore)!.getInstance().state.languagePackage
    Modal.confirm({
      iconType: " ",
      title: parsedMessage.header,
      content: parsedMessage.main,
      okText: translate("common.ok", i18n),
      cancelText: translate("common.cancel", i18n),
      onOk() {
        callback(true)
      },
      onCancel() {
        callback(false)
      }
    })
  }
})
export const HistoryStore = createHistoryStore(history)
