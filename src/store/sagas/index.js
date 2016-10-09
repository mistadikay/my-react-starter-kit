import { requestExampleSaga } from './example';

export default function *rootSaga() {
  try {
    yield [
      requestExampleSaga()
    ];
  // because we need full callstack when erorr occured
  } catch (e) {
    /* eslint-disable */
    console.error(e);
    /* eslint-enable */
  }
}
