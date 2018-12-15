import * as actionTypes from '../actions/locations/locationActionTypes';
import _ from 'lodash';

const initial = {
    // locations : [ 
    //     {id: 1, title: 'House 1', address: 'Heiligenstockweg, 60435 Frankfurt am Main, Germany', lat:50.16295142079499, lng:8.715686156250058},
    //     {id: 2, title: 'House 2', address: 'Wagrainäcker, 70378 Stuttgart, Germany', lat:48.82869612761667, lng:9.210070921875058},
    //     {id: 3, title: 'House 3', address: 'Mittlere-Isar-Straße, 85774 München, Germany', lat:48.18087078700962, lng:11.627063109375058},
    //     {id: 4, title: 'House 4', address: 'Berlin, Germany', lat:52.52000659999999, lng:13.404953999999975},
    //     {id: 5, title: 'House 1', address: 'Heiligenstockweg, 60435 Frankfurt am Main, Germany', lat:50.16295142079499, lng:8.715686156250058},
    //     {id: 6, title: 'House 2', address: 'Wagrainäcker, 70378 Stuttgart, Germany', lat:48.82869612761667, lng:9.210070921875058},
    //     {id: 7, title: 'House 3', address: 'Mittlere-Isar-Straße, 85774 München, Germany', lat:48.18087078700962, lng:11.627063109375058},
    //     {id: 8, title: 'House 4', address: 'Berlin, Germany', lat:52.52000659999999, lng:13.404953999999975},
    //     {id: 9, title: 'House 1', address: 'Heiligenstockweg, 60435 Frankfurt am Main, Germany', lat:50.16295142079499, lng:8.715686156250058},
    //     {id: 10, title: 'House 2', address: 'Wagrainäcker, 70378 Stuttgart, Germany', lat:48.82869612761667, lng:9.210070921875058},
    //     {id: 11, title: 'House 3', address: 'Mittlere-Isar-Straße, 85774 München, Germany', lat:48.18087078700962, lng:11.627063109375058},
    //     {id: 12, title: 'House 4', address: 'Berlin, Germany', lat:52.52000659999999, lng:13.404953999999975}
    // ],
    locations:[],
    local_locations: [],
    searchValue: '',
    location_id: 0,
    selectedLocation: {},
    isNewLocation: false,
    isLoading: false,
    updateError: false
}

const reducer = (state = initial, action) => {
    switch(action.type){
        case actionTypes.FETCH_LOCATIONS_FULFILLED:{
            const locations = _.map(action.payload, (location)=>{location.selected=false; return location});
            const local_locations = [...locations];
            const searchValue = '';
            const isLoading = false;
            const isNewLocation = true;
            const updateError = false;

            console.log('locations => '+JSON.stringify(locations));

            return{
                ...state,
                searchValue,
                local_locations,
                locations,
                isLoading,
                isNewLocation,
                updateError
            }
        }

        case actionTypes.WIDGET_SELECTED_LOCATION:{
            let selectedLocation = {};
            const updateError = false;
            const location_id = action.payload;
            const isNewLocation = true;
            const locations = _.map(state.locations, (location)=>{
                if(location.id === location_id){
                    location.selected = true;
                    selectedLocation = {...location};
                    return location;
                }
                location.selected = false;
                return location;
            });
            const isLoading = false;

            return{
                ...state,
                location_id,
                isNewLocation,
                locations,
                selectedLocation,
                isLoading,
                updateError
            }
        }

        case actionTypes.FETCH_LOCATIONS_LOADING_START:{
            return {
                ...state,
                isLoading: true
            }
        }

        case actionTypes.INIT_NEW_LOCATION:{
            const selectedLocation = {id:0, title:'', address:'',lat:'',lng:''};
            const isNewLocation = false;
            const updateError = false;

            return {
                ...state,
                selectedLocation,
                isNewLocation,
                updateError
            }
        }

        case actionTypes.UPDATE_CURRENT_LOCATION:{
            const selectedLocation = action.payload;
            const isNewLocation = false;
            const updateError = false;

            return {
                ...state,
                isNewLocation,
                selectedLocation,
                updateError
            }
        }

        case actionTypes.UPDATE_LOCATION_FAILED:{
            const updateError = true;
            
            return {
                ...state, 
                updateError
            }
        }

        case actionTypes.SEARCH_LOCATION_FULFILLED:{
            const val = action.payload.trim().toLowerCase();

            //Search by all category and search in a uniform case [lowercase]
            const result = _.filter(state.local_locations, (location)=>_.includes(location.title.toLowerCase(), val) || 
                                                              _.includes(location.lat+'', val) ||
                                                              _.includes(location.lng+'', val) ||
                                                              _.includes(location.address.toLowerCase(), val));

            const locations = val.length?result:[...state.local_locations];
            const isLoading = false;

            return{
                ...state,
                locations,
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