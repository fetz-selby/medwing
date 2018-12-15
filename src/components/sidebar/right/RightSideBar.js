import React from 'react';
import PropTypes from 'prop-types';
import '../../../assets/styles/layout.css';
import cancel from '../../../assets/icons/cancel.svg';
import './right-sidebar.css';
import DetailForm from '../../detail-form';

const CloseButton = (props) =>
    <div className='cancel-container'>
        <img className='cancel' onClick={props.onClose} src={cancel} alt='cancel'/>
    </div>

const ClearFix = () =>
    <div className='clearfix'></div>


const SideBarMenuItemContainer = props =>
        <nav className={props.showSideBar ? 'show sidebar-container sidebar-right' : 'sidebar-container sidebar-right'}>
            <CloseButton onClose={props.onClose}/>
            <ClearFix />
            <DetailForm suggestions={props.addressSuggestions}
                        location={props.location} 
                        isUpdate={props.isUpdate}
                        fetchSuggestions={props.fetchAddressSuggestion}
                        clearSuggestions={props.clearAddressSuggestion}
                        currentLocationState={props.currentLocationState}
                        isNewDetail={props.isNewDetail}
                        onUpdate={props.onUpdate}
                        onDelete={props.onDelete}
                        />
        </nav>
    


SideBarMenuItemContainer.propTypes = {
    showSideBar: PropTypes.bool.isRequired,
    fetchAddressSuggestion: PropTypes.func.isRequired,
    clearAddressSuggestion: PropTypes.func.isRequired,
    addressSuggestions: PropTypes.array.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    location: PropTypes.object,
    currentLocationState: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isNewDetail: PropTypes.bool,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default SideBarMenuItemContainer

