import {all} from 'redux-saga/effects';
import locationsSaga from './locationSaga';
import geoSaga from './geoSaga';

export default function* () {
    yield all([
        locationsSaga(),
        geoSaga()
      ])
}