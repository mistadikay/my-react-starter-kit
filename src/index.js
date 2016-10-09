// @flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Router from '~/components/Router';
import store from '~/store';

import '~/styles/main.global.css';
import 'normalize-css';

// https://github.com/crysislinux/chrome-react-perf
if (process.env !== 'production') {
  /* eslint-disable global-require */
  window.Perf = require('react-addons-perf');
  /* eslint-enable global-require */
}

render(
  <Provider store={ store }>
    <Router />
  </Provider>,
  document.getElementById('app')
);
