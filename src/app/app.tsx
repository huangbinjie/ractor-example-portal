import * as React from 'react';
import * as Loadable from 'react-loadable';
import { Providers } from 'ractor-react';
import { LanguageStore, LanguageStoreState } from '@app/stores/language/language.store';
import { system } from '@app/system/system';
import { TokenStore, TokenStoreState } from '@app/stores/token/token.store';
import { InitiateApp } from '@app/stores/InitiateApp';
import { InterceptorsModal } from '@components/interceptors';
import { LanguageProvider } from 'lib/ractor-i18n/Provider';

type Props = LanguageStoreState & TokenStoreState

@Providers([LanguageStore, TokenStore])
export class App extends React.Component<Props> {
  public static defaultProps: Props
  public componentDidMount() {
    setTimeout(() => system.dispatch(new InitiateApp()), 0)
  }
  public render() {
    return (
      <>
        <InterceptorsModal />
        {
          this.props.languagePackage && this.props.token
            ? <LanguageProvider i18n={this.props.languagePackage}><Layout /></LanguageProvider>
            : "loading configuration..."
        }
      </>
    )
  }
}

const Layout = Loadable({
  loader: () => import('@app/layout'),
  loading() {
    return <div>loading...</div>
  }
});