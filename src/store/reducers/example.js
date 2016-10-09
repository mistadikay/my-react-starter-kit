import { handleActions } from 'redux-actions';
import actionTypes from '../action-types';

const initialState = {
  data: undefined,
  isLoading: false
};

export default handleActions({
  [actionTypes.EXAMPLE_REQUEST]: (state, { payload, error, meta }) => {
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
