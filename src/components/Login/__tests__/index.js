/* eslint-env es6, jest */
import React from 'react';
import { shallow } from 'enzyme';

import Login from '../Login';

test('Login', () => {
  const component = shallow(
    <Login />
  );

  expect(component).toMatchSnapshot();
});
