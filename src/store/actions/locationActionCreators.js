import * as actionTypes from './actionTypes';

export const fetchLocations = () => (
    {type: actionTypes.FETCH_LOCATIONS}
)

export const fetchLocation = (value) => (
    {type: actionTypes.FETCH_LOCATION, payload: value}
)

export const fetchLocationLoadingStart = () => (
    {type: actionTypes.FETCH_LOCATIONS_LOADING_START}
)

export const fetchLocationFulfilled = (users) => (
    {type: actionTypes.FETCH_LOCATIONS_FULFILLED, payload: users}
)

export const searchLocation = (value) => (
    {type: actionTypes.SEARCH_LOCATION, payload: value}
)

export const searchLocationFulfilled = (value) => (
    {type: actionTypes.SEARCH_LOCATION_FULFILLED, payload: value}
)