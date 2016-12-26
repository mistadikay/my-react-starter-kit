import { handleActions } from 'redux-actions';
import { types as exampleTypes } from '~/state/example';

// reducer
export const initialState = {};
export default handleActions({
  [exampleTypes.EXAMPLE_REQUEST_START]: (state) => ({ ...state, example: true }),
  [exampleTypes.EXAMPLE_REQUEST_END]: (state) => ({ ...state, example: false })
}, initialState);

// selectors
export const getExampleProgress = ({ progress }) => progress.example;
