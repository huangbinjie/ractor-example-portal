import i18n from "i18n/i18n";

export function getLanguage(): Promise<typeof i18n> {
  return Promise.resolve(i18n)
}