import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as api from '~/api';
import actionTypes from '../action-types.js';
import { onRequestExampleEnd } from '../actions/example';

export function *requestExample({ meta }) {
  if (meta.isLoading) {
    try {
      const results = yield call(api.requestExample);

      yield put(onRequestExampleEnd(results));
    } catch (error) {
      // can also throw error notifications here
      yield put(onRequestExampleEnd(
        error instanceof Error ? error : new Error(error)
      ));
    }
  }
}

export function *requestExampleSaga() {
  yield* takeEvery(actionTypes.EXAMPLE_REQUEST, requestExample);
}
