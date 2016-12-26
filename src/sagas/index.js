/*
  Sagas are separate from the state, because they're the only place where different domains can
  intersect.

  Sagas are grouped by domain and composed in root saga — very similar to reducers in `state`.
*/
import example from './example';

export default function *rootSaga() {
  try {
    yield [
      example()
    ];
  // catch uncatched errors
  } catch (e) {
    /* eslint-disable */
    console.error(e);
    /* eslint-enable */
  }
}
