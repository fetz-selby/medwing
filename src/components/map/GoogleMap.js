import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GMap from 'google-map-react';
import {MAP_KEYS, DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM} from '../../config';
import Marker from './Marker';

import './google-map.css';

class GoogleMap extends Component {

    loadMarkers = (data) => 
        data.map((location)=>
            <Marker key={location.id} 
                    lat={location.lat} 
                    lng={location.lng} 
                    id={location.id}
                    location={location.address}
                    selected={location.selected} 
                    click={this.onMarkerClickedHandler}/>
        )
    
    onMarkerClickedHandler = (id) =>{
        console.log('id => '+id)
    }

    render() {

        return <div className='map' >
                <GMap 
                    bootstrapURLKeys={{key: MAP_KEYS}}
                    defaultCenter={DEFAULT_MAP_CENTER}
                    defaultZoom={DEFAULT_MAP_ZOOM}
                >

                {this.loadMarkers(this.props.locations)}
                </GMap>
            </div>
    }
}

GoogleMap.propTypes = {
    locations: PropTypes.array.isRequired
}

export default GoogleMap;
