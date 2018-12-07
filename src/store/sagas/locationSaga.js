import * as actions from '../actions/actionTypes';
import * as locationActionCreator from '../actions/locationActionCreators';
import {takeLatest, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import axios from 'axios';
import {REQUEST_DELAY} from '../../config';
// import {BASE_URL} from '../../config';

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
    yield takeLatest(actions.FETCH_LOCATIONS, getAllLocationsAsync);
    yield takeLatest(actions.SEARCH_LOCATION, searchLocation)   
}