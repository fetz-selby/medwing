import {FETCH_LOCATIONS, SEARCH_LOCATION, PUSH_LOCATION_UPDATE, DELETE_LOCATION} from '../actions/locations/locationActionTypes';
import * as locationActionCreator from '../actions/locations/locationActionCreators';
import * as appActionCreators from '../actions/app/appActionCreators';
import {THIRD_PARTY_DOWN, THIRD_PARTY_OK} from '../actions/app/appActionTypes';
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

    try{
        const locations = yield axios.get(url, {params:{token,user_id}});
        locations.data.success ? yield put(locationActionCreator.fetchLocationFulfilled(locations.data.results)):
                             yield put(appActionCreators.networkError('could not load user locations'));
    }catch(error){
        yield put(appActionCreators.networkError('could not load user locations'));
    }
}

function* updateLocationsAsync(action){
    yield put(locationActionCreator.fetchLocationLoadingStart());
    const user_id = cookies.load('user_id');
    const token = cookies.load('token');

    const location = {...action.payload};
    location.user_id = user_id;
    location.token = token;

    const url = BASE_URL + `/medwing/api/v1/locations/`;

    try{
        const update = (location.id)?
        yield axios.put(url+location.id, location):
        yield axios.post(url, location);

        if(update.data.success){
            yield put(initPage());
            yield call(getAllLocationsAsync);
        } else if(!update.data.success && update.data.code === THIRD_PARTY_OK){
            yield put(appActionCreators.invalidAddress('sorry, address can not be found'));
        }else if(!update.data.success && update.data.code === THIRD_PARTY_DOWN){
            yield put(appActionCreators.invalidAddress('sorry, third party geolocation is down'));
        }else{
            locationActionCreator.updateLocationFailed();
        }
    }catch(error){
        yield put(appActionCreators.networkError('update of location failed due to network'));
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

    try{
        const status = yield axios.delete(url, {params:{user_id, token}});

        if(status.data.success){
            yield put(initPage());
            yield call(getAllLocationsAsync);
        }else{
            yield put(locationActionCreator.deleteLocationFailed());
        }
    }catch(error){
        yield put(appActionCreators.networkError('delete request failed due to network'));
    }
}

export default function* watchLocations(){
    yield takeLatest(FETCH_LOCATIONS, getAllLocationsAsync);
    yield takeLatest(SEARCH_LOCATION, searchLocation);
    yield takeLatest(PUSH_LOCATION_UPDATE, updateLocationsAsync);
    yield takeLatest(DELETE_LOCATION, deleteLocationAsync);
}