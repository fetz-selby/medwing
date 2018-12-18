import {FETCH_LOCATIONS, SEARCH_LOCATION, PUSH_LOCATION_UPDATE, DELETE_LOCATION} from '../actions/locations/locationActionTypes';
import * as locationActionCreator from '../actions/locations/locationActionCreators';
import {initPage} from '../actions/app/appActionCreators';
import {takeLatest, put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import axios from 'axios';
import {BASE_URL, REQUEST_DELAY} from '../../config';
import cookies from 'react-cookies';

function* getAllLocationsAsync(){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    const user_id = cookies.load('user_id');
    const token = cookies.load('token');
    const url = BASE_URL + `/medwing/api/v1/locations/`;

    const locations = yield axios.get(url, {params:{token,user_id}});

    locations.data.success ? yield put(locationActionCreator.fetchLocationFulfilled(locations.data.results)):
                             yield put();
}

function* updateLocationsAsync(action){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    const user_id = cookies.load('user_id');
    const token = cookies.load('token');

    const location = {...action.payload};
    location.user_id = user_id;
    location.token = token;

    const url = BASE_URL + `/medwing/api/v1/locations/`;

    const update = (location.id)?
    yield axios.put(url+location.id, location):
    yield axios.post(url, location);

    if(update.data.success){
        yield put(initPage());
        yield call(getAllLocationsAsync);
    }else{
        locationActionCreator.updateLocationFailed();
    }
}

function* searchLocation(action){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    yield delay(REQUEST_DELAY);
    yield put(locationActionCreator.searchLocationFulfilled(action.payload));
}

function* deleteLocationAsync(action){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    const user_id = cookies.load('user_id');
    const token = cookies.load('token');
    const location_id = action.payload;

    const url = BASE_URL + `/medwing/api/v1/locations/${location_id}`;
    const status = yield axios.delete(url, {params:{user_id, token}});

    if(status.data.success){
        yield put(initPage());
        yield call(getAllLocationsAsync);
    }else{
        yield put(locationActionCreator.deleteLocationFailed());
    }
}

export default function* watchLocations(){
    yield takeLatest(FETCH_LOCATIONS, getAllLocationsAsync);
    yield takeLatest(SEARCH_LOCATION, searchLocation);
    yield takeLatest(PUSH_LOCATION_UPDATE, updateLocationsAsync);
    yield takeLatest(DELETE_LOCATION, deleteLocationAsync);
}