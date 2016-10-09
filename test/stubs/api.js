/* globals Promise:true */

function mockResponse() {
  return function() {
    return Promise.resolve('Testing value');
  };
}

export const requestExample = mockResponse();
