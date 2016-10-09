/* eslint-env es6, jest */
import React from 'react';
import { shallow } from 'enzyme';

import Router from '../Router';

test('Router', () => {
  const component = shallow(
    <Router />
  );

  expect(component).toMatchSnapshot();
});
