import {FETCH_LOCATIONS, SEARCH_LOCATION} from '../actions/locations/locationActionTypes';
import * as locationActionCreator from '../actions/locations/locationActionCreators';
import {takeLatest, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import axios from 'axios';
import {REQUEST_DELAY} from '../../config';

function* getAllLocationsAsync(){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    const locations = yield axios.get('/resources/locations.json');
    yield put(locationActionCreator.fetchLocationFulfilled(locations.data));
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