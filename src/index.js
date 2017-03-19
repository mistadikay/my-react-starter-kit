// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { store, history } from '~/store';

import App from '~/components/App';
import Login from '~/components/Login';
import Dashboard from '~/components/Dashboard';

import '~/styles/main.global.css';
import 'normalize-css';

// https://github.com/crysislinux/chrome-react-perf
if (process.env !== 'production') {
  /* eslint-disable global-require */
  window.Perf = require('react-addons-perf');
  /* eslint-enable global-require */
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route component={Dashboard}/>
        </Switch>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
