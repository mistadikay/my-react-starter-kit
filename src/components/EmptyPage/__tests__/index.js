/* eslint-env es6, jest */
import React from 'react';
import { shallow } from 'enzyme';

import EmptyPage from '../EmptyPage';

test('EmptyPage', () => {
  const component = shallow(
    <EmptyPage/>
  );

  expect(component).toMatchSnapshot();
});
