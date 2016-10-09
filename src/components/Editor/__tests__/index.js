/* eslint-env es6, jest */
import React from 'react';
import { shallow } from 'enzyme';

import Editor from '../Editor';

test('Editor', () => {
  const component = shallow(
    <Editor />
  );

  expect(component).toMatchSnapshot();
});
