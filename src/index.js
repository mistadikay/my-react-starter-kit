// @flow

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import type { Module } from '~/types';
import App from '~/components/App';
import { store, history } from '~/store';

import '~/styles/main.global.css';
import 'normalize-css';

// https://github.com/crysislinux/chrome-react-perf
if (process.env !== 'production') {
  /* eslint-disable global-require */
  window.Perf = require('react-addons-perf');
  /* eslint-enable global-require */
}

const renderApp = (Component: typeof React.Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Component/>
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(App);

declare var module: Module;
if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(require('./components/App').default);
  });
}
