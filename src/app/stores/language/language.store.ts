import { Store } from "ractor";
import { getLanguage } from "@app/services/i18n";
import { InitiateApp } from "@app/stores/InitiateApp";
import { LanguageChanged } from "@app/stores/language/LanguageChanged";
import { I18n } from "lib/ractor-i18n";

export type LanguageStoreState = {
  language: string
  languagePackage: I18n
}

export class LanguageStore extends Store<Partial<LanguageStoreState>> {
  public state: LanguageStoreState = {
    language: 'zh_CN',
    languagePackage: {}
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(InitiateApp, async () => {
        const languagePackage = await getLanguage()
        this.setState({ languagePackage })
        this.context.system.dispatch(new LanguageChanged(languagePackage))
      })
      .build()
  }
}