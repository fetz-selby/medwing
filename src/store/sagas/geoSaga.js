import {ADDRESS_SEARCH} from '../actions/geo/geoActionTypes';
import * as geoActionCreators from '../actions/geo/geoActionCreators';
import {takeLatest, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import axios from 'axios';
import {REQUEST_DELAY} from '../../config';

function* getAddressSearchAsync(action){
    yield put(geoActionCreators.fetchAddressSearchLoadingStart());

    //Testing purposes
    const key = 'AIzaSyC53deGuD9TB4tJsbB2h_NtOMzUxANOVZs';
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';
    const address = action.payload;

    if(address.trim().length < 3){
        return;
    }

    yield delay(REQUEST_DELAY);

    const addresses = yield axios.get(url, {params :{key,address}});

    (addresses.data.results.length)?
    yield put(geoActionCreators.fetchAddressSearchFulfilled(addresses.data.results[0].formatted_address,
                                                            addresses.data.results[0].geometry.location.lat,
                                                            addresses.data.results[0].geometry.location.lng)):
    yield put(geoActionCreators.fetchAddressSearchFulfilledWithNoMatch());
    
}

export default function* watchGeo(){
    yield takeLatest(ADDRESS_SEARCH, getAddressSearchAsync);
}