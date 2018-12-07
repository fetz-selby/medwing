import React from 'react';
import PropTypes from 'prop-types';
import marker_icon from '../../assets/icons/marker.svg';
import selected_icon from '../../assets/icons/selected-marker.svg';
import './google-map.css';


const Marker = (props) => 
    <div onClick={()=>props.click(props.id)}>
        <img src={props.selected?selected_icon:marker_icon} alt={props.lat+', '+props.lng} className='marker' />
    </div>

Marker.propTypes = {
    lat: PropTypes.number,
    lng: PropTypes.number,
    id: PropTypes.number,
    selected: PropTypes.bool,
    click: PropTypes.func
}

export default Marker