import * as React from "react";
const PropTypes = require("prop-types")

export type Context = { i18n: I18n }
export type I18n = {
  [key: string]: string
}
export const contextType = {
  parent: PropTypes.object,
  system: PropTypes.object,
  stores: PropTypes.array,
  i18n: PropTypes.object
}

export const childContextType = {
  parent: PropTypes.object,
  system: PropTypes.object,
  stores: PropTypes.array,
  i18n: PropTypes.object
}

type Props = {
  i18n: I18n
}

export class LanguageProvider extends React.Component<Props> {
  public static contextTypes = contextType
  public static childContextTypes = childContextType
  public getChildContext() {
    return { ...this.context, i18n: this.props.i18n }
  }
  public render() {
    return React.Children.only(this.props.children)
  }
}