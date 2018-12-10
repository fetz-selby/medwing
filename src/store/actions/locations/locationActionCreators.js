import * as actionTypes from './locationActionTypes';

export const fetchLocations = () => (
    {type: actionTypes.FETCH_LOCATIONS}
)

export const fetchLocation = (value) => (
    {type: actionTypes.FETCH_LOCATION, payload: value}
)

export const fetchLocationLoadingStart = () => (
    {type: actionTypes.FETCH_LOCATIONS_LOADING_START}
)

export const fetchLocationFulfilled = (locations) => (
    {type: actionTypes.FETCH_LOCATIONS_FULFILLED, payload: locations}
)

export const searchLocation = (value) => (
    {type: actionTypes.SEARCH_LOCATION, payload: value}
)

export const searchLocationFulfilled = (value) => (
    {type: actionTypes.SEARCH_LOCATION_FULFILLED, payload: value}
)

export const widgetSelectedLocation = (id) => (
    {type: actionTypes.WIDGET_SELECTED_LOCATION, payload: id}
)

export const updateCurrentLocation = (location) => (
    {type: actionTypes.UPDATE_CURRENT_LOCATION, payload: location}
)