import * as actionTypes from '../actions/app/appActionTypes';

const initial = {
    logout: false,
    // Set default app view to locations for test purposes
    module: 'Locations',
    leftSideBarToggle: true,
    rightSideBarToggle: false,
    isLocationUpdate: false
}

const reducer = (state = initial, action) => {
    switch(action.type){
        case actionTypes.APP_LOGGED_IN:{
            const logout = false;

            return{
                ...state,
                logout
            }
        }

        case actionTypes.APP_LOGGED_OUT:{
            const logout = true;

            return{
                ...state,
                logout
            }
        }

        case actionTypes.APP_MODULE_CHANGE:{
            const module = action.payload;

            return {
                ...state,
                module
            }
        }

        case actionTypes.APP_SHOW_LEFT_SIDEBAR:{
            const leftSideBarToggle = true;

            return {
                ...state,
                leftSideBarToggle
            }
        }

        case actionTypes.APP_HIDE_LEFT_SIDEBAR:{
            const leftSideBarToggle = false;

            return {
                ...state,
                leftSideBarToggle
            }
        }

        case actionTypes.APP_SHOW_RIGHT_SIDEBAR:{
            const rightSideBarToggle = true;

            return {
                ...state,
                rightSideBarToggle
            }
        }

        case actionTypes.APP_HIDE_RIGHT_SIDEBAR:{
            const rightSideBarToggle = false;
            console.log('Toggled! '+rightSideBarToggle);
            return {
                ...state,
                rightSideBarToggle
            }
        }

        case actionTypes.APP_LOCATION_IS_UPDATE:{
            const isLocationUpdate = true;
            return {
                ...state,
                isLocationUpdate
            }
        }

        case actionTypes.APP_LOCATION_NOT_UPDATE:{
            const isLocationUpdate = false;

            return {
                ...state,
                isLocationUpdate
            }
        }
        
        default:{
            return{
                ...state
            }
        }
    }
}

export default reducer;