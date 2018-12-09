import {combineReducers} from 'redux';
import locationReducer from './locationReducer';
import appReducer from './appReducer';
import geoReducer from './geoReducer';

export default combineReducers({
    locations : locationReducer,
    app : appReducer,
    geo: geoReducer
})