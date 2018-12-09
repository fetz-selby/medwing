import * as actionTypes from '../actions/geo/geoActionTypes';
import _ from 'lodash';

const initial = {
    suggestions: [],
    loading: false
}

const reducer = (state = initial, action) => {
    switch(action.type){

        case actionTypes.ADDRESS_SEARCH_LOADING_START:{
            const loading = false;
            return {
                ...state,
                loading
            }
        }

        case actionTypes.ADDRESS_SEARCH_FULFILLED:{
            const suggestions = _.concat([], action.payload);

            console.log('Suggestion from Google => '+ JSON.stringify(suggestions));
            return {
                ...state,
                suggestions
            }
        }

        case actionTypes.ADDRESS_SEARCH_FULFILLED_WITH_NO_MATCH:{
            const suggestions = [];
            return {
                ...state,
                suggestions
            }
        }
        
        default:{
            return{
                ...state
            }
        }
    }
}

export default reducer;