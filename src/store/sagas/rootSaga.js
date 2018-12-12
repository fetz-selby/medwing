import {all} from 'redux-saga/effects';
import locationsSaga from './locationSaga';
import geoSaga from './geoSaga';
import appSaga from './appSaga';

export default function* () {
    yield all([
        locationsSaga(),
        geoSaga(),
        appSaga()
      ])
}