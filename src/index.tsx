import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '@app/app';
import { Provider } from "ractor-react"
import { system } from '@app/system/system';
import stores from '@app/stores';
import './index.css';
import "./index.scss";
import registerServiceWorker from 'registerServiceWorker';

ReactDOM.render(
  <Provider system={system} stores={stores}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
