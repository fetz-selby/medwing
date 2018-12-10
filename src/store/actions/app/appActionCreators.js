import * as actionTypes from './appActionTypes';

export const setModule = (module) => (
    {type: actionTypes.APP_MODULE_CHANGE, payload: module}
)

export const showSideBar = () => (
    {type: actionTypes.APP_SHOW_SIDEBAR}
)

export const hideSideBar = () => (
    {type: actionTypes.APP_HIDE_SIDEBAR}
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

export const isLocationNotUpdate = () => (
    {type: actionTypes.APP_LOCATION_NOT_UPDATE}
)