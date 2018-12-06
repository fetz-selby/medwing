import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initial = {
    loactions : [ 
        {address: 'Heiligenstockweg, 60435 Frankfurt am Main, Germany', lat:50.16295142079499, lng:8.715686156250058},
        {address: 'Wagrainäcker, 70378 Stuttgart, Germany', lat:48.82869612761667, lng:9.210070921875058},
        {address: 'Mittlere-Isar-Straße, 85774 München, Germany', lat:48.18087078700962, lng:11.627063109375058},
        {address: 'Berlin, Germany', lat:52.52000659999999, lng:13.404953999999975}
    ],
    searchValue: '',
    isLoading: false
}

const reducer = (state = initial, action) => {
    switch(action.type){
        case actionTypes.FETCH_LOCATIONS_FULFILLED:{
            const locations = [...action.payload];
            const searchValue = '';
            // const activeUsers = _.filter([...action.payload], {active: true});
            const isLoading = false;

            return{
                ...state,
                searchValue,
                locations,
                isLoading
            }
        }

        case actionTypes.FETCH_LOCATIONS_LOADING_START:{
            return {
                ...state,
                isLoading: true
            }
        }

        case actionTypes.SEARCH_LOCATION_FULFILLED:{
            const val = action.payload.trim().toLowerCase();

            //Search by all category and search in a uniform case [lowercase]
            const match = _.filter(state.locations, (location)=>_.includes(location.email.toLowerCase(), val) || 
                                                              _.includes(location.mobile, val) ||
                                                              _.includes(location.name.toLowerCase(), val) ||
                                                              _.includes(location.department.toLowerCase(), val));
            const isLoading = false;

            return{
                ...state,
                isLoading
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