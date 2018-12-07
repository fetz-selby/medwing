import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initial = {
    locations : [ 
        {id: 1, title: 'House 1', address: 'Heiligenstockweg, 60435 Frankfurt am Main, Germany', lat:50.16295142079499, lng:8.715686156250058},
        {id: 2, title: 'House 2', address: 'Wagrainäcker, 70378 Stuttgart, Germany', lat:48.82869612761667, lng:9.210070921875058},
        {id: 3, title: 'House 3', address: 'Mittlere-Isar-Straße, 85774 München, Germany', lat:48.18087078700962, lng:11.627063109375058},
        {id: 4, title: 'House 4', address: 'Berlin, Germany', lat:52.52000659999999, lng:13.404953999999975}
    ],
    searchValue: '',
    location_id: 0,
    isLoading: false
}

const reducer = (state = initial, action) => {
    switch(action.type){
        case actionTypes.FETCH_LOCATIONS_FULFILLED:{
            const locations = _.map(state.locations, (location)=>{location.selected=false; return location});
            const searchValue = '';
            // const activeUsers = _.filter([...action.payload], {active: true});
            const isLoading = false;

            console.log('Data faked already => '+JSON.stringify(locations));

            return{
                ...state,
                searchValue,
                locations,
                isLoading
            }
        }

        case actionTypes.WIDGET_SELECTED_LOCATION:{
            const location_id = action.payload;
            const locations = _.map(state.locations, (location)=>{
                if(location.id === location_id){
                    location.selected = true;
                    return location;
                }
                location.selected = false;
                return location;
            });
            const isLoading = false;

            console.log('Updated locations => '+JSON.stringify(locations));
            return{
                ...state,
                location_id,
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