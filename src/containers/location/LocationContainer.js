import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as locationActions from '../../store/actions/locations/locationActionCreators';
import * as appActions from '../../store/actions/app/appActionCreators';
import GoogleMap from '../../components/map';
import './location.css';

class LocationContainer extends Component {

    onLocationMarkerClickedHandler=(id)=>{
        this.props.markerSelected(id);
        this.props.isLocationUpdate();
        this.props.showRightSideBar();
    }

    render() {
        const {locations, keys} = this.props;
        return <div className='map-container'>
                <GoogleMap onLocationMarkerClicked={this.onLocationMarkerClickedHandler} 
                           locations={locations}
                           keys={keys}/>
            </div>
    }
}

const mapStateToProps = state =>{
    return {
        isLoading: state.locations.sLoading,
        locations: state.locations.locations,
        keys: state.app.keys
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        loadLocations : () => dispatch(locationActions.fetchLocations()),
        searchLocation : (val) => dispatch(locationActions.searchLocation(val)),
        markerSelected : (id)=>dispatch(locationActions.widgetSelectedLocation(id)),
        showRightSideBar:() => dispatch(appActions.showRightSideBar()),
        isLocationUpdate:()=>dispatch(appActions.isLocationUpdate())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer);
