// @flow

import API from './config';
import request from './request';

export const requestExample = (): Promise<*> => {
  return request({
    httpMethod: 'GET',
    url: API.example
  });
};
