/* eslint-env es6, jest */
import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from '../Dashboard';

test('Dashboard', () => {
  const component = shallow(
    <Dashboard />
  );

  expect(component).toMatchSnapshot();
});
