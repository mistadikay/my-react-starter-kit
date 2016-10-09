// @flow

import {
  getRequestURL,
  getBody,
  checkStatus,
  parseJSON,
  checkForErrors
} from './utils';
import type { Url, HttpMethod } from '~/types';

// generic http layer
export default (params: {
  httpMethod: HttpMethod,
  url: Url,
  data?: *,
  isFileUpload?: boolean
}): Promise<*> => {
  const requestUrl = getRequestURL(params);
  const body = getBody(params);
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  return fetch(
    requestUrl,
    {
      method: params.httpMethod,
      headers,
      body
    }
  )
  .then(checkStatus)
  .then(parseJSON)
  .then(checkForErrors);
};
