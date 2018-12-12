import * as appActionTypes from '../actions/app/appActionTypes';
import * as appActionCreators from '../actions/app/appActionCreators';
import {takeLatest, put} from 'redux-saga/effects';
import axios from 'axios';
import {BASE_URL} from '../../config';
import cookies from 'react-cookies';

function* getUsersAsync(){
    if(cookies.load('token') && cookies.load('user_id')){
        yield put(appActionCreators.userAlreadyExist());
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

    (session.data.success)?
    yield put(appActionCreators.acquireSessionFulfilled(session.data.results.token, 
                                                        session.data.results.user_id,
                                                        session.data.results.username)):
    yield put(appActionCreators.acquireSessionFailed())
}

export default function* watchApp(){
    yield takeLatest(appActionTypes.APP_FETCH_ALL_USERS, getUsersAsync);
    yield takeLatest(appActionTypes.APP_ACQUIRE_SESSION, getSessionAsync);

}