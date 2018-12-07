import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as locationActions from '../../store/actions/locationActionCreators';

import GoogleMap from '../../components/map';
import './location.css';

class LocationContainer extends Component {

    componentDidMount = () => {
       
    }

    render() {
        const {locations} = this.props;
        return <div className='map-container'>
                <GoogleMap locations={locations}/>
            </div>
    }
}

const mapStateToProps = state =>{
    return {
        isLoading: state.locations.sLoading,
        locations: state.locations.locations
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        loadLocations : () => dispatch(locationActions.fetchLocations()),
        searchLocation : (val) => dispatch(locationActions.searchLocation(val)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer);
