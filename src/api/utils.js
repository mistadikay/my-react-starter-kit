import format from 'string-template';
import join from 'url-join';

import API from './config';
import type { HttpMethod, Body, Url } from '~/types';

/**
 * Validates parsed response
 *
 * TODO investigate possible `errors` field format options
 */
export const checkForErrors = (response: Response) => {
  if (!('errors' in response)) {
    return response;
  }

  throw new Error(response.statusText);
};

/**
 * Adds query params from `data` to the given `url` (ex: for GET requests)
 */
export const addQueryParams = (
  { url, data }:
  { url: Url, data?: Object }
): Url => {
  const queryData = data || {};
  const queryKeys = Object.keys(queryData);

  if (queryKeys.length === 0) {
    return url;
  }

  return format(url, data);
};

/**
 * Creates url for http request
 */
export const getRequestURL = ({ url, data }: { url: Url, data?: Object }): Url => {
  let requestUrl = url;

  // add API root url if given url is not an absolute path
  if (url.indexOf('/') !== 0 && url.indexOf('http') !== 0) {
    requestUrl = join(API.root, requestUrl);
  }

  // add params from `data` to the query string
  requestUrl = addQueryParams({ url: requestUrl, data });

  return requestUrl;
};

/**
 * Stringify body data for request
 */
export const getBody = (
  { httpMethod, data, isFileUpload }:
  { httpMethod: HttpMethod, data?: Object, isFileUpload?: boolean }
): Body => {
  if (httpMethod !== 'GET' && typeof data === 'object' && data !== null) {
    // when there is a file upload we need to create request body with FormData constructor
    if (isFileUpload) {
      return Object.keys(data).reduce((formData: FormData, key: string): FormData => {
        formData.append(key, data[key]);

        return formData;
      }, new FormData());
    }

    // for other cases stringifying is enough
    return JSON.stringify(data);
  }

  return null;
};

/**
 * Raises an error if status is unacceptable
 */
const CODE_OK = 200;
const CODE_NO_CONTENT = 204;
const CODE_REDIRECTIONS = 300;

export const checkStatus = (response: Response) => {
  if (response.status >= CODE_OK && response.status < CODE_REDIRECTIONS) {
    return response;
  }

  throw new Error(response.statusText);
};

/**
 * Parses response from whatwg-fetch to JSON
 */
export const parseJSON = (response: Response) => {
  // don't try to parse empty content
  if (response.status === CODE_NO_CONTENT) {
    return Promise.resolve({});
  }

  return response.json();
};
