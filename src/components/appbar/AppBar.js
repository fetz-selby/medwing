import React from 'react';
import './appbar.css';
import PropTypes from 'prop-types';
import toggle from '../../assets/icons/switch.svg';

const AppBar = props => 
<div className='app-bar'>
    <div className='switch-module'>
        <img className='toggle-img' src={toggle} alt='toggle' onClick={()=>props.sideBarToggleClicked()}/>
        <div className='module-title' >{props.title}</div>
    </div>
    <div className='avatar-username'>
        <img className='avatar-img' src={props.avatar} alt={props.username}/>
        <div className='username-title'>{props.username}</div>
    </div>
</div>

AppBar.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    sideBarToggleClicked: PropTypes.func.isRequired
}

export default AppBar;