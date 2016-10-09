// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import ensureFSAMiddleware from '@meadow/redux-ensure-fsa';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

// side effects
// https://github.com/yelouafi/redux-saga
const sagaMiddleware = createSagaMiddleware();
const middleware = [ sagaMiddleware ];

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

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;
