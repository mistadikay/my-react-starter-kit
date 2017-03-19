// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import ensureFSAMiddleware from '@meadow/redux-ensure-fsa';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '~/state';
import rootSaga from '~/sagas';

// side effects
// https://github.com/yelouafi/redux-saga
const sagaMiddleware = createSagaMiddleware();
const history = createBrowserHistory();
const middleware = [ sagaMiddleware, routerMiddleware(history) ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(
    // ensure that actions are FSA compliant
    // https://github.com/acdlite/flux-standard-action
    ensureFSAMiddleware(),
    // ensure that there are no mutations inside a dispatch or between dispatches
    // https://github.com/leoasis/redux-immutable-state-invariant
    immutableStateInvariant()
  );
}

// Chrome redux dev-tools
// https://github.com/zalmoxisus/redux-devtools-extension
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable no-underscore-dangle */

export const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);
export { history };

sagaMiddleware.run(rootSaga);
