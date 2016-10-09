// @flow

import { createAction } from 'redux-actions';

import actionTypes from '../action-types.js';

type RequestMeta = {
  isLoading: boolean
};

export const requestExample = createAction(
  actionTypes.EXAMPLE_REQUEST,
  null,
  (): RequestMeta => ({ isLoading: true })
);

export const onRequestExampleEnd = createAction(
  actionTypes.EXAMPLE_REQUEST,
  null,
  (): RequestMeta => ({ isLoading: false })
);
