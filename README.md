This is a partial (not completed) application for searching and viewing contacts information on the web and mobile. It's a [React App](https://reactjs.org/) with [Redux](https://redux.js.org/) and [Redux-Saga](https://github.com/redux-saga/redux-saga). And with some utility helpers from [Lodash](https://lodash.com/), [Axios](https://github.com/axios/axios) and [Jest](https://jestjs.io/) for testing the components.

## How to Run
In the project directory, run
`npm install`
This will download all the required packages need to run the application.

Run 
`npm run test` to assert all tests, then
`npm run build` to build the project for production

Move or copy the `build` folder into a webserver and deploy the application by hitting the `index.html`


## Configurations

#### API data for contacts
You can navigate to `build/resources/users.json` to add more data to the contacts list


#### Search delay
Search for contact(s) has a delay(1000 millisec) set to it. This is to allow app users to complete the contact info or filter. It can be configured at `REQUEST_DELAY` in the `config.js` file located in the root directory.   


## Technologies and Frameworks used
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Redux-Saga](https://github.com/redux-saga/redux-saga)
* [Webpack](https://webpack.js.org/)
* [Jest](https://jestjs.io/)
* [Enzyme](https://airbnb.io/enzyme/)
* [Lodash](https://lodash.com/)

## Issues
Image file size and quality are not so great for the application
