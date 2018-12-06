import {combineReducers} from 'redux';
import locationReducer from './locationReducer';
import appReducer from './appReducer';

export default combineReducers({
    locations : locationReducer,
    app : appReducer
})