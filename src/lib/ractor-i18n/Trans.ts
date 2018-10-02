import * as React from "react"
import { contextType, Context, I18n } from "./Provider";

type Props = {
  i18n?: I18n
  data: { [key: string]: string }
  children: string
}

export class Trans extends React.Component<Props> {
  public static contextTypes = contextType
  public static defaultProps: Props
  public context!: Context
  private template: string

  constructor(props: Props & { children?: string }) {
    super(props)
    this.template = props.children as string
  }

  public render() {
    return translate(this.template, this.props.i18n || this.context.i18n, this.props.data)
  }
}

export function translate(template: string, i18n: I18n, data = {} as { [key: string]: string }): string {
  const str = i18n[template.trim()]
  return str.replace(/(\{\S+\})/g, (a, v) => {
    const key = v.replace(/\{|\}/g, '')
    return data[key] || ''
  })
}

// export function translate(template: string, i18n: I18n, data = {} as { [key: string]: string }): string {
//   const str = template.split(".").reduce((acc, key) => acc[key], i18n) as string
//   return str.replace(/(\{\S+\})/, (a, v) => {
//     const key = v.replace(/\{|\}/g, '')
//     return data[key] || ''
//   })
// }