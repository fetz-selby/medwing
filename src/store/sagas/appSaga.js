import * as appActionTypes from '../actions/app/appActionTypes';
import * as appActionCreators from '../actions/app/appActionCreators';
import {fetchLocationFulfilled} from '../actions/locations/locationActionCreators';

import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {BASE_URL} from '../../config';
import cookies from 'react-cookies';

function* getUsersAsync(){
    if(cookies.load('token') && cookies.load('user_id')){
        yield put(appActionCreators.userAlreadyExist());
        yield put(appActionCreators.fetchUserLocations(cookies.load('user_id'), cookies.load('token')))
        return;
    }

    const url = BASE_URL+'/medwing/api/users';
    const users = yield axios.get(url);

    (users.data.success)?
    yield put(appActionCreators.fetchAllUsersFulfilled(users.data.results)):
    yield put(appActionCreators.fetchAllUsersFailed());
}

function* getSessionAsync(action){
   
    const user_id = action.payload;
    const url = BASE_URL+`/medwing/api/sessions/user_id/${user_id}`;

    const session = yield axios.get(url);

    if(session.data.success){
        const {user_id, token, username} = session.data.results;

        yield put(appActionCreators.fetchUserLocations(user_id, token))
        yield put(appActionCreators.acquireSessionFulfilled(token, user_id, username))
    }else{
        yield put(appActionCreators.acquireSessionFailed())
    }
}

function* getUserLocationsAsync(action){
   
    const user_id = action.payload.user_id;
    const token = action.payload.token
    const url = BASE_URL+`/medwing/api/v1/locations/`;

    const locations = yield axios.get(url, {params:{user_id,token}});
    (locations.data.success)?
    yield put(fetchLocationFulfilled(locations.data.results)):
    yield put();
}

export default function* watchApp(){
    yield takeLatest(appActionTypes.APP_FETCH_ALL_USERS, getUsersAsync);
    yield takeLatest(appActionTypes.APP_ACQUIRE_SESSION, getSessionAsync);
    yield takeLatest(appActionTypes.APP_FETCH_USER_LOCATIONS, getUserLocationsAsync);
}