import React from 'react';
import InfoWidget from '../../infowidget';

import PropTypes from 'prop-types';
import '../../../assets/styles/layout.css';
import logo from '../../../assets/icons/medwing.svg';
import './left-sidebar.css';

const SideBarLogo = () =>{

    const logo_label = 'medwing';
    return <ul className='logo-container'>
                <li className='logo'>
                     <img src={logo} alt={logo_label}></img>
                </li>
            </ul>
}

const SearchInput = (props) =>
    <input className='search' onChange={props.onChange} />


const SideBarMenuItemContainer = props =>
        <nav className={props.showSideBar ? 'show sidebar-container sidebar' : 'sidebar-container sidebar'}>
            <SideBarLogo />
            <SearchInput onChange={props.onSearchChange}/>
            {props.locations.map((location)=>
                <InfoWidget key={location.id} 
                            id={location.id}
                            title={location.title} 
                            address={location.address}
                            lat={location.lat}
                            lng={location.lng}
                            click={props.locationWidgetClick} />
            )}
        </nav>
    


SideBarMenuItemContainer.propTypes = {
    showSideBar: PropTypes.bool.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    locations : PropTypes.array.isRequired
}

export default SideBarMenuItemContainer

