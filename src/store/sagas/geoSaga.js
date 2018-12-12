import {ADDRESS_SEARCH} from '../actions/geo/geoActionTypes';
import * as geoActionCreators from '../actions/geo/geoActionCreators';
import {takeLatest, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import axios from 'axios';
import {BASE_URL,REQUEST_DELAY} from '../../config';
import cookies from 'react-cookies';

function* getAddressSearchAsync(action){
    yield put(geoActionCreators.fetchAddressSearchLoadingStart());

    const url = BASE_URL+'/medwing/api/v1/geocoding/search';
    const address = action.payload;
    const token = cookies.load('token');

    if(address.trim().length < 3){
        return;
    }

    yield delay(REQUEST_DELAY);

    const addresses = yield axios.get(url, {params :{token,address}});

    (addresses.data.success)?
    yield put(geoActionCreators.fetchAddressSearchFulfilled(addresses.data.results.address,
                                                            addresses.data.results.lat,
                                                            addresses.data.results.lng)):
    yield put(geoActionCreators.fetchAddressSearchFulfilledWithNoMatch());
    
}

export default function* watchGeo(){
    yield takeLatest(ADDRESS_SEARCH, getAddressSearchAsync);
}