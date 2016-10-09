/* eslint-env es6, jest */
import { put, call } from 'redux-saga/effects';

import * as api from '~/api';
import { requestExampleSaga, requestExample } from '../example';
import * as actions from '../../actions/example';
import actionTypes from '../../action-types';

describe('Sagas', () => {
  describe('example', () => {
    test('requestExampleSaga', () => {
      const iterator = requestExampleSaga();

      expect(
        iterator.next().value.TAKE.pattern
      ).toEqual(
        actionTypes.EXAMPLE_REQUEST
      );
    });

    describe('requestExample', () => {
      const iterator = requestExample(actions.requestExample());

      it('sends api.requestExample request', () => {
        expect(
          iterator.next(actions.requestExample()).value
        ).toEqual(
          call(api.requestExample)
        );
      });

      it('dispatches action onRequestExampleEnd(data)', () => {
        const data = { data: [ { test: 'test3' } ] };
        const expected = put(actions.onRequestExampleEnd(data));
        const actual = iterator.next(data).value;

        expect(expected.payload).toEqual(actual.payload);
        expect(expected.type).toEqual(actual.type);
      });

      it('throws error on error', () => {
        const error = new Error('Some error');
        const expected = put(actions.onRequestExampleEnd(error));
        const actual = iterator.throw(error).value;

        expect(expected.payload).toEqual(actual.payload);
        expect(expected.type).toEqual(actual.type);
      });
    });
  });
});
