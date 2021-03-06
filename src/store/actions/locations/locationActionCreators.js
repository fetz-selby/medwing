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

export const initNewLocation = () => (
    {type: actionTypes.INIT_NEW_LOCATION}
)

export const updateLocationFailed = () => (
    {type: actionTypes.UPDATE_LOCATION_FAILED}
)

export const pushLocationUpdate = (location) => (
    {type: actionTypes.PUSH_LOCATION_UPDATE, payload: location}
)

export const deleteLocation = (id) => (
    {type: actionTypes.DELETE_LOCATION, payload: id}
)

export const deleteLocationFailed = () => (
    {type: actionTypes.DELETE_LOCATION_FAILED}
)