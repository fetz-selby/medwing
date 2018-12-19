import {ADDRESS_SEARCH} from '../actions/geo/geoActionTypes';
import * as geoActionCreators from '../actions/geo/geoActionCreators';
import * as appActionCreators from '../actions/app/appActionCreators';
import {THIRD_PARTY_DOWN, THIRD_PARTY_OK} from '../actions/app/appActionTypes';

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

    try{
        const addresses = yield axios.get(url, {params :{token,address}});

        if(addresses.data.success){
        yield put(geoActionCreators.fetchAddressSearchFulfilled(addresses.data.results.address,
                                                                addresses.data.results.lat,
                                                                addresses.data.results.lng))
        }else if(!addresses.data.success && addresses.data.code === THIRD_PARTY_DOWN){
            yield put(appActionCreators.networkError('sorry, third party geolocation is down'));
        }else if(!addresses.data.success && addresses.data.code === THIRD_PARTY_OK){
            yield put(appActionCreators.invalidAddress('sorry, address can not be found'));
        }
    }catch(error){
        yield put(appActionCreators.networkError('sorry, could not retrieve location due to network'));
    }
    
}

export default function* watchGeo(){
    yield takeLatest(ADDRESS_SEARCH, getAddressSearchAsync);
}