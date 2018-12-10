import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/layout.css';
import logo from '../../../assets/icons/medwing.svg';
import './right-sidebar.css';
import DetailForm from '../../detail-form';

const SideBarLogo = () =>{

    const logo_label = 'medwing';
    return <ul className='logo-container'>
                <li className='logo'>
                     <img src={logo} alt={logo_label}></img>
                </li>
            </ul>
}


const SideBarMenuItemContainer = props =>
        <nav className={props.showSideBar ? 'show sidebar-container sidebar-right' : 'sidebar-container sidebar-right'}>
            <SideBarLogo />
            <DetailForm suggestions={props.addressSuggestions}
                        location={props.location} 
                        isUpdate={props.isUpdate}
                        fetchSuggestions={props.fetchAddressSuggestion}
                        clearSuggestions={props.clearAddressSuggestion}
                        currentLocationState={props.currentLocationState}
                        />
        </nav>
    


SideBarMenuItemContainer.propTypes = {
    showSideBar: PropTypes.bool.isRequired,
    fetchAddressSuggestion: PropTypes.func.isRequired,
    clearAddressSuggestion: PropTypes.func.isRequired,
    addressSuggestions: PropTypes.array.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    location: PropTypes.object,
    currentLocationState: PropTypes.func.isRequired
}

export default SideBarMenuItemContainer

