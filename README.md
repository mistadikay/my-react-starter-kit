# WIP
___

## TODO

- [x] babel
- [x] react and react-dom
- [x] redux
  - [x] basic setup
  - [x] add actual actions/reducers/sagas
  - [ ] normalizr?
- [x] webpack
  - [x] basic setup
  - [ ] smarter polyfilling
  - [ ] refactor and cleanup
- [x] add http-client (whatwg-fetch)
- [x] testing
  - [x] eslint
    - [x] basic setup
    - [x] eslint-config-tough with react rules
  - [x] stylelint
  - [x] flow
  - [x] jest for unit-tests
  - [ ] redux state/sagas tests
  - [ ] jest + phantomjs + node-horseman for integration tests
- [x] react-router (3 for now)
  - [x] basic setup
  - [ ] split bundle
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
