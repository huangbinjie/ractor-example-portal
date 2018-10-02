import { I18n } from "lib/ractor-i18n";

export class LanguageChanged {
  constructor(public i18n: I18n) { }
}