import {FETCH_LOCATIONS, SEARCH_LOCATION} from '../actions/locations/locationActionTypes';
import * as locationActionCreator from '../actions/locations/locationActionCreators';
import {takeLatest, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import axios from 'axios';
import {BASE_URL, REQUEST_DELAY} from '../../config';
import cookies from 'react-cookies';

function* getAllLocationsAsync(){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    const userId = cookies.load('user_id');
    const token = cookies.load('token');
    const url = BASE_URL + `/medwing/api/v1/locations/${userId}`;

    const locations = yield axios.get(url, {params:{token}});

    locations.data.success ? yield put(locationActionCreator.fetchLocationFulfilled(locations.data)):
                             yield put();
}

function* searchLocation(action){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    yield delay(REQUEST_DELAY);
    yield put(locationActionCreator.searchLocationFulfilled(action.payload));
}

export default function* watchLocations(){
    yield takeLatest(FETCH_LOCATIONS, getAllLocationsAsync);
    yield takeLatest(SEARCH_LOCATION, searchLocation)   
}