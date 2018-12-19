## Introduction
This is a Geocoding implementation of Maps(Basically, a mini form of google maps). Features of the application include searching, creating, viewing and deleting of geo coding points. Supported viewport are desktop and widescreens. It's a [React App](https://reactjs.org/) with [Redux](https://redux.js.org/) and [Redux-Saga](https://github.com/redux-saga/redux-saga). And with some utility helpers from [GoogleMaps](https://cloud.google.com/maps-platform/), [Lodash](https://lodash.com/), [Axios](https://github.com/axios/axios) and [Jest](https://jestjs.io/) for testing the components.

## Features
* User based (Default users John Doe, and Jane Smith)
* Automatic and filtered(filters can be title, address/location, lat or lng) search for locations saved
* Auto-suggest for new address / updating address
* Auto highlight of markers on location selection
* Mega Map view/playground

## How to Run
In the project directory, run
`npm install`
This will download all the required packages need to run the application.

## Configurations
Navigate to `src/config.js`

#### Add Map keys
find `MAP_KEYS` and insert your map keys
 
#### Add Backend base url
find `BASE_URL` and insert the base url for the backend

#### Search delay
Search for location(s) has a delay(1500 millisec) set to it. This is to allow app users to complete the location name or filter. It can be configured at `REQUEST_DELAY` in the `config.js` file located in the root directory.

Run 
`npm run test` to assert all tests, then
`npm run build` to build the project for production

Move or copy the `build` folder into a webserver and deploy the application by hitting the `index.html`

## Technologies and Frameworks used
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Redux-Saga](https://github.com/redux-saga/redux-saga)
* [Webpack](https://webpack.js.org/)
* [Jest](https://jestjs.io/)
* [Enzyme](https://airbnb.io/enzyme/)
* [Lodash](https://lodash.com/)
* [GoogleMap](https://cloud.google.com/maps-platform)

## Backlog
Implement UI loading for async requests
