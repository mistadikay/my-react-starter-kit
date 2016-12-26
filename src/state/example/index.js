import { createAction, handleActions } from 'redux-actions';
import mirrorCreator from 'mirror-creator';

// action types
export const types = mirrorCreator([
  'EXAMPLE_REQUEST_START',
  'EXAMPLE_REQUEST_END'
]);

// action creators
export const actions = {
  requestExample: createAction(types.EXAMPLE_REQUEST_START),
  onRequestExampleEnd: createAction(types.EXAMPLE_REQUEST_END)
};

// reducer
export const initialState = null;
export default handleActions({
  [types.EXAMPLE_REQUEST_END]: (state, { payload, error }) => {
    if (!error) {
      return payload;
    }

    return state;
  }
}, initialState);

// selectors
export const getExampleData = ({ example }) => example;
