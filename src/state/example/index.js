import { createAction, handleActions } from 'redux-actions';
import mirrorCreator from 'mirror-creator';

// action types
export const types = mirrorCreator([
  'EXAMPLE_REQUEST'
]);

// action creators
export const actions = {
  requestExample: createAction(types.EXAMPLE_REQUEST, null, () => ({ isLoading: true })),
  onRequestExampleEnd: createAction(types.EXAMPLE_REQUEST, null, () => ({ isLoading: false }))
};

// reducer
export const initialState = {
  data: undefined,
  isLoading: false
};
export default handleActions({
  [types.EXAMPLE_REQUEST]: (state, { payload, error, meta }) => {
    if (meta.isLoading || error) {
      return {
        ...state,
        isLoading: meta.isLoading
      };
    }

    return {
      ...state,
      data: payload,
      isLoading: false
    };
  }
}, initialState);

// selectors
export const getExampleData = ({ example }) => example.data;
export const getExampleLoadingStatus = ({ example }) => example.isLoading;
