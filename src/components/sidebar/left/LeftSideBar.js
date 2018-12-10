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

const AddLocationButton = (props) =>
    <div className='add-map-container'>
        <div className='add-map-btn'>Add Map</div>
    </div>

const SearchInput = (props) =>
    <input className='search' placeholder='search saved location' onChange={props.onChange} />


const SideBarMenuItemContainer = props =>
        <nav className={props.showSideBar ? 'show sidebar-container sidebar' : 'sidebar-container sidebar'}>
            <SideBarLogo />
            <AddLocationButton />
            <SearchInput onChange={props.onSearchChange}/>
            <div className='location-widget-container'>
                {props.locations.map((location)=>
                    <InfoWidget key={location.id} 
                                id={location.id}
                                title={location.title} 
                                address={location.address}
                                lat={location.lat}
                                lng={location.lng}
                                click={props.locationWidgetClick} />
                )}
            </div>
        </nav>
    


SideBarMenuItemContainer.propTypes = {
    showSideBar: PropTypes.bool.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    locations : PropTypes.array.isRequired
}

export default SideBarMenuItemContainer

