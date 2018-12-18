import React from 'react';
import PropTypes from 'prop-types';
import arrow from '../../assets/icons/right-arrow.svg';
import './info-widget.css';
import _ from 'lodash';
import {ADDRESS_TRUNCATE_LIMIT} from '../../config';

const InfoWidget = (props) => 
    <div className='info-widget-container' onClick={()=>props.click(props.id)}>
        <div className='info'>
            <div className='row'>
                <div className='title'>{props.title}</div>
            </div>

            <div className='clearfix'></div>

            <div className='row'>
                <div className='address'>{_.truncate( props.address, {length: ADDRESS_TRUNCATE_LIMIT, separator: ' '})}</div>
            </div>

            <div className='clearfix'></div>

            <div className='row'>
                <div className='points'>{props.lat}</div>
                <div className='points'>{props.lng}</div>
            </div>
        </div>
        <div className='action'>
            <img className='img' src={arrow} alt='hide'/>
        </div>
    </div>

InfoWidget.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    click: PropTypes.func
}

export default InfoWidget;