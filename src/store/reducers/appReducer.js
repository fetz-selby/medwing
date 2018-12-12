import * as actionTypes from '../actions/app/appActionTypes';
import cookies from 'react-cookies';

const initial = {
    logout: false,
    // Set default app view to locations for test purposes
    module: 'Locations',
    leftSideBarToggle: true,
    rightSideBarToggle: false,
    isLocationUpdate: false,
    token:'',
    users:[],
    user_id:0,
    username:''
}

const getTomorrow=()=>
    new Date().setDate(new Date().getDate() + 1);


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

        case actionTypes.APP_FETCH_ALL_USERS_FULFILLED:{
            const users = action.payload;

            return {
                ...state,
                users
            }
        }

        case actionTypes.APP_USER_ALREADY_EXIT:{
            const token = cookies.load('token');
            const user_id = cookies.load('user_id');

            return {
                ...state,
                token,
                user_id
            }
        }

        case actionTypes.APP_USER_LOGOUT:{
            const token = '';
            const user_id = '';

            cookies.remove('token');
            cookies.remove('user_id')
            return {
                ...state,
                token,
                user_id
            }
        }

        case actionTypes.APP_ACQUIRE_SESSION_FULFILLED:{
            const user_id = action.payload.user_id;
            const token = action.payload.token;
            const username = action.payload.username;

            //Store in cookies
            cookies.save('token', token);
            cookies.save('user_id', user_id);
            cookies.save('username', username);

            return {
                ...state,
                user_id,
                token,
                username
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