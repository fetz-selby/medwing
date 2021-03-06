import React from 'react';
import InfoWidget from '../../infowidget';

import PropTypes from 'prop-types';
import '../../../assets/styles/layout.css';
import logo from '../../../assets/icons/medwing.svg';
import './left-sidebar.css';

const SideBarLogo = (props) =>{

    const logo_label = 'medwing';
    return <div className='logo-container'>
                <div className='logo'>
                     <img src={logo} alt={logo_label}></img>
                </div>
                <div onClick={props.onLogout} className='logout'>logout</div>
                <div className='clearfix'></div>
            </div>
}

const AddLocationButton = (props) =>
    <div className='add-map-container'>
        <div className='add-map-btn' onClick={props.onAddClicked}>Add Map</div>
    </div>

const SearchInput = (props) =>
    <input className='search' placeholder='search saved location' onChange={props.onChange} />

const UserOption = (props) =>
    <div>
        <div className='user-option'>
            <div className='user-label'>Welcome 
                 <span className='user-name'>{props.username?' '+props.username:' User'}</span>!
            </div>
        </div>
        <div className='clearfix'></div>
    </div>

const SideBarMenuItemContainer = props =>{

        function renderWidgets(locations){
            return locations.map((location)=>
                <InfoWidget key={location.id} 
                                id={location.id}
                                title={location.title} 
                                address={location.address}
                                lat={location.lat}
                                lng={location.lng}
                                click={props.locationWidgetClick} />
            )
        }

        function renderEmpty(){
            return <div className='empty-location'>Empty</div>
        }

        return <nav className={props.showSideBar ? 'show sidebar-container sidebar' : 'sidebar-container sidebar'}>
                <SideBarLogo onLogout={props.onLogout}/>
                <UserOption username={props.username} />
                <AddLocationButton onAddClicked={props.onAddClicked}/>
                <SearchInput onChange={props.onSearchChange}/>
                <div className='location-widget-container'>
                    {props.locations.length ? renderWidgets(props.locations): renderEmpty()}
                </div>
            </nav>
}

SideBarMenuItemContainer.propTypes = {
    showSideBar: PropTypes.bool.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    locations : PropTypes.array.isRequired,
    onAddClicked: PropTypes.func,
    username: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired
}

export default SideBarMenuItemContainer