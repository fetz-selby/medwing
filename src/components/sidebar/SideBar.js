import React from 'react';

import * as menuAction from '../../store/actions/appRoute';
import PropTypes from 'prop-types';
import '../../assets/styles/layout.css';
import './sidebar.css';

const SideBarLogo = () =>{

    const logo_label = 'inventorum';
    return <ul className='logo-container'>
                <li className='logo'>
                     <img alt={logo_label}></img>
                </li>
            </ul>
}

const SideBarMenu = props =>
<ul className='sidebar-list'>
               <li className='sidebar-item' onClick={()=>props.menuClicked(menuAction.MY_LOCATIONS.module)}>
                   <img alt={'point of sales'}/>
                   <div>MY LOCATION</div>
               </li>
             
            </ul>

const SideBarMenuItemContainer = props =>{
    return <nav className={props.showSideBar ? 'show sidebar-container sidebar' : 'sidebar-container sidebar'}>
            <SideBarLogo />
            <SideBarMenu menuClicked={props.menuEvent}/>
        </nav>
    
}

SideBarMenu.propTypes = {
    menuClicked: PropTypes.func.isRequired
}

SideBarMenuItemContainer.propTypes = {
    showSideBar: PropTypes.bool.isRequired
}

export default SideBarMenuItemContainer

