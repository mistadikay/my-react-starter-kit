# WIP
___

## TODO

- [ ] babel
  - [ ] switch to babel-preset-env
  - [x] switch to babili
- [ ] react
  - [ ] add best 3rd-party components
  - [x] add preact(-compat) for production build
  - [ ] add recompose
- [ ] redux
  - [x] basic setup
  - [x] add actual actions/reducers/sagas
  - [ ] rethink file structure
  - [ ] normalizr?
- [ ] webpack
  - [x] basic setup
  - [ ] add lodash-webpack-plugin and other bundle optimiztion techniques
  - [ ] refactor and cleanup
- [ ] server
  - [x] add http-client (whatwg-fetch)
  - [ ] add mock server
- [ ] testing
  - [x] eslint
    - [x] basic setup
    - [x] eslint-config-tough with react rules
  - [x] stylelint
  - [x] flow
  - [x] jest for unit-tests
  - [ ] try typescript as an alternative to flow
  - [ ] redux state/sagas tests
  - [ ] webdriver + browserstack for e2e tests
- [ ] react-router
  - [x] basic setup
  - [x] switch to react-router 4
  - [ ] split bundle with dynamic imports and a loader
- [ ] add Dockerfile with nginx to run the application
- [ ] better README

## Prerequisites

- `node@6+`
- `npm@3+`
- (optional) `yarn@0.16.0+`

## Usage

Install dependencies

```sh
npm install
# or
yarn
```

Run development server

```sh
npm start
```

Build for production

```sh
npm run build
```

Run linters (eslint + stylelint + flow)

```sh
npm run lint
```

Run unit-tests

```sh
npm test
```
