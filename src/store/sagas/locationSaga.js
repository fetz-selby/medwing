import {FETCH_LOCATIONS, SEARCH_LOCATION, PUSH_LOCATION_UPDATE} from '../actions/locations/locationActionTypes';
import * as locationActionCreator from '../actions/locations/locationActionCreators';
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
    console.log('Exec there2');

    yield put(locationActionCreator.fetchLocationLoadingStart());
    const userId = cookies.load('user_id');
    const token = cookies.load('token');

    const location = {...action.payload};
    location.user_id = userId;
    location.token = token;

    const url = BASE_URL + `/medwing/api/v1/locations/`;

    console.log('location OBj => '+JSON.stringify(location));

    const update = (location.id)?
    yield axios.put(url+location.id, location):
    yield axios.post(url, location);

    (update.data.success)?
    yield call(getAllLocationsAsync):
    locationActionCreator.updateLocationFailed()
}

function* searchLocation(action){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    yield delay(REQUEST_DELAY);
    yield put(locationActionCreator.searchLocationFulfilled(action.payload));
}

export default function* watchLocations(){
    yield takeLatest(FETCH_LOCATIONS, getAllLocationsAsync);
    yield takeLatest(SEARCH_LOCATION, searchLocation);
    yield takeLatest(PUSH_LOCATION_UPDATE, updateLocationsAsync);
}