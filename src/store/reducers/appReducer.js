import * as actionTypes from '../actions/actionTypes';

const initial = {
    logout: false,
    // Set default app view to locations for test purposes
    module: 'Locations',
    sideBarToggle: false
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

        case actionTypes.APP_SHOW_SIDEBAR:{
            const sideBarToggle = true;

            return {
                ...state,
                sideBarToggle
            }
        }

        case actionTypes.APP_HIDE_SIDEBAR:{
            const sideBarToggle = false;

            return {
                ...state,
                sideBarToggle
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