import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as locationActions from '../../store/actions/locationActionCreators';

import GoogleMap from '../../components/map';
import './location.css';

class LocationContainer extends Component {

    state = {
        locations : [
            {id: 1, address: 'Heiligenstockweg, 60435 Frankfurt am Main, Germany', lat:50.16295142079499, lng:8.715686156250058},
            {id: 2, address: 'Wagrainäcker, 70378 Stuttgart, Germany', lat:48.82869612761667, lng:9.210070921875058},
            {id: 3, address: 'Mittlere-Isar-Straße, 85774 München, Germany', lat:48.18087078700962, lng:11.627063109375058},
            {id: 4, address: 'Berlin, Germany', lat:52.52000659999999, lng:13.404953999999975}
        ]
    }
    componentDidMount = () => {
       
    }

    render() {

        return <div className='map-container'>
                <GoogleMap locations={this.state.locations}/>
            </div>
    }
}

const mapStateToProps = state =>{
    return {
        isLoading: state.locations.sLoading
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        loadLocations : () => dispatch(locationActions.fetchLocations()),
        searchLocation : (val) => dispatch(locationActions.searchLocation(val)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer);
