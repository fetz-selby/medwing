import React from 'react';
import './loader.css';
import PropTypes from 'prop-types';


const BasicLoader = props => 
<div className='loader'>
    Loading {props.module} ...
</div>

BasicLoader.propTypes = {
    module: PropTypes.string.isRequired
}

export default BasicLoader;