import {all} from 'redux-saga/effects';
import locationsSaga from './locationSaga';

export default function* () {
    yield all([
        locationsSaga(),
      ])
}