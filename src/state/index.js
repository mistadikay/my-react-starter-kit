/*
  Everything related to the state of a specific domain:
  - action types (exported as `types`)
  - action creators (exported as `actions`)
  - reducers (exported as `default`)
  - selectors (exported by their names as `getSomething`, etc.)

  Each domain inside `state` should be isolated from others. The only exception might be selectors,
  because sometimes a selector might construct data from different domains.

  If domain file becomes too big maybe it should be splitted into several domains.

  There shouldn't be subdomains in order to keep normalized state and simple project structure.

  inspired by: https://hackernoon.com/my-journey-toward-a-maintainable-project-structure-for-react-redux-b05dfd999b5#.ufzz18cpz
*/
import { combineReducers } from 'redux';
import example from './example';
import progress from './progress';

export default combineReducers({
  example,
  progress
});
