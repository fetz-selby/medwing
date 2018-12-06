import React from 'react';
import PropTypes from 'prop-types';
import marker_icon from '../../assets/icons/marker.svg';
import './google-map.css';


const Marker = (props) => 
    <div>
        <img src={marker_icon} className='marker' onClick={()=>props.click(props.id)}/>
    </div>

Marker.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    id: PropTypes.number,
    click: PropTypes.func
}

export default Marker