import * as actionTypes from './geoActionTypes';

export const fetchAddressSearch = (suggested) => (
    {type: actionTypes.ADDRESS_SEARCH, payload: suggested}
)

export const fetchAddressSearchFulfilled = (address, lat, lng) => (
    {type: actionTypes.ADDRESS_SEARCH_FULFILLED, payload: {address,lat,lng}}
)

export const fetchAddressSearchLoadingStart = () => (
    {type: actionTypes.ADDRESS_SEARCH_LOADING_START}
)

export const fetchAddressSearchFulfilledWithNoMatch=()=>(
    {type: actionTypes.ADDRESS_SEARCH_FULFILLED_WITH_NO_MATCH}
)
