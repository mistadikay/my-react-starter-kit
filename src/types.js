/*
  Shared flow types used in more than one module
*/

export type Module = {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
export type Url = string | typeof URL;
export type Body = string | null;
