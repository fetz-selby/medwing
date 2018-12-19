import * as actionTypes from './appActionTypes';

export const setModule = (module) => (
    {type: actionTypes.APP_MODULE_CHANGE, payload: module}
)

export const showLeftSideBar = () => (
    {type: actionTypes.APP_SHOW_LEFT_SIDEBAR}
)

export const showRightSideBar = () => (
    {type: actionTypes.APP_SHOW_RIGHT_SIDEBAR}
)

export const hideLeftSideBar = () => (
    {type: actionTypes.APP_HIDE_LEFT_SIDEBAR}
)

export const hideRightSideBar = () => (
    {type: actionTypes.APP_HIDE_RIGHT_SIDEBAR}
)

export const startLoading = () => (
    {type: actionTypes.APP_LOADING_START}
)

export const doneLoading = () => (
    {type: actionTypes.APP_LOADING_DONE}
)

export const isLocationUpdate = () => (
    {type: actionTypes.APP_LOCATION_IS_UPDATE}
)

export const isNotLocationUpdate = () => (
    {type: actionTypes.APP_LOCATION_NOT_UPDATE}
)

export const fetchAllUsers = () => (
    {type: actionTypes.APP_FETCH_ALL_USERS}
)

export const fetchAllUsersFulfilled = (users) => (
    {type: actionTypes.APP_FETCH_ALL_USERS_FULFILLED, payload: users}
)

export const fetchAllUsersFailed = (message) => (
    {type: actionTypes.APP_FETCH_ALL_USERS_FAILED, payload: message}
)

export const userAlreadyExist = () => (
    {type: actionTypes.APP_USER_ALREADY_EXIT}
)

export const acquireSession= (user_id) =>(
    {type: actionTypes.APP_ACQUIRE_SESSION, payload: user_id}
)

export const networkError = (message) =>(
    {type: actionTypes.APP_NETWORK_ERROR, payload: message}
)

export const closeNetworkError = () =>(
    {type: actionTypes.APP_CLOSE_NETWORK_ERROR}
)

export const acquireSessionFulfilled = (token, user_id, username, keys) =>(
    {type: actionTypes.APP_ACQUIRE_SESSION_FULFILLED, payload: {token, user_id, username, keys}}
)

export const userLogout = () =>(
    {type: actionTypes.APP_USER_LOGOUT}
)

export const showDeleteConfirmation = (id, title) =>(
    {type: actionTypes.APP_SHOW_DELETE_CONFIRMATION_DIALOG, payload: {id, title}}
)

export const hideDeleteConfirmation = () =>(
    {type: actionTypes.APP_HIDE_DELETE_CONFIRMATION_DIALOG}
)

export const fetchUserLocations = (user_id, token) =>(
    {type: actionTypes.APP_FETCH_USER_LOCATIONS, payload: {user_id, token}}
)

export const initPage = () =>(
    {type: actionTypes.APP_INIT_PAGE}
)

export const invalidAddress = (message) =>(
    {type: actionTypes.APP_INVALID_ADDRESS, payload: message}
)

export const invalidAddressClose = () =>(
    {type: actionTypes.APP_INVALID_ADDRESS_CLOSE}
)