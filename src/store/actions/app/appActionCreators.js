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

export const fetchAllUsersFailed = () => (
    {type: actionTypes.APP_FETCH_ALL_USERS_FAILED}
)

export const userAlreadyExist = () => (
    {type: actionTypes.APP_USER_ALREADY_EXIT}
)

export const acquireSession= (user_id) =>(
    {type: actionTypes.APP_ACQUIRE_SESSION, payload: user_id}
)

export const acquireSessionFailed = () =>(
    {type: actionTypes.APP_ACQUIRE_SESSION_FAILED}
)

export const acquireSessionFulfilled = (token, user_id) =>(
    {type: actionTypes.APP_ACQUIRE_SESSION_FULFILLED, payload: {token, user_id}}
)



