import { put, call, takeLatest } from 'redux-saga/effects';

import { requestExample } from '~/api';
import { types, actions } from '~/state/example';

export function *handleExampleRequest() {
  try {
    const results = yield call(requestExample);

    yield put(actions.onRequestExampleEnd(results));
  } catch (error) {
    // can also throw error notifications here
    yield put(actions.onRequestExampleEnd(
      error instanceof Error ? error : new Error(error)
    ));
  }
}

export default function *() {
  yield [
    takeLatest(types.EXAMPLE_REQUEST_START, handleExampleRequest)
  ];
}
