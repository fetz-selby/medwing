import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import LeftSideBar from './components/sidebar/left';
import RightSideBar from './components/sidebar/right';
import LocationContainer from './containers/location/LocationContainer';
import Overlay from './components/overlay';
import Login from './components/login';
import LocationInfo from './components/location-info';
import * as appAction from './store/actions/app/appActionCreators';
import * as geoAction from './store/actions/geo/geoActionCreators';
import {fetchLocations, 
        widgetSelectedLocation, 
        searchLocation, 
        updateCurrentLocation, 
        initNewLocation, 
        pushLocationUpdate,
        deleteLocation} from './store/actions/locations/locationActionCreators';
import './assets/styles/layout.css';
import './assets/styles/reset.css';
import Dialog from './components/dialog';
import ErrorInfo from './components/error';

class App extends Component {

  componentDidMount(){
    this.props.loadUsers();
  }

  sideBarToggleClickedHandler = () => {
    this.props.showSideBar();
  }

  locationWidgetClickHandler = (id) => {
    this.props.selectedLocation(id);
    this.props.isLocationUpdate();
    this.props.showRightSideBar();
  }

  onSearchChangeHandler = (event) =>{
    this.props.searchLocation(event.target.value);
  }

  onCloseRightSideBar = () => {
    this.props.hideRightSideBar();
  }

  fetchAddressSuggestion=(address)=>{
    this.props.fetchAddress(address);
  }

  clearAddressSuggestion=()=>{
    this.props.clearAddressSuggestion();
  }

  currentLocationState=(location)=>{
    this.props.updateCurrentLocation(location);
  }

  onAddClickedHandler=()=>{
    this.props.isNotLocationUpdate();
    this.props.initNewLocation();
    this.props.showRightSideBar();
  }

  onLoginClickedHandler=(user_id)=>{
    this.props.getSession(user_id);
  }

  onLogoutHandler=()=>{
    this.props.logout();
    this.props.loadUsers();
    this.props.hideRightSideBar();
  }

  hideDeleteDialogHandler=()=>{
    this.props.hideDeleteConfirmationDialog();
  }

  onUpdateClickedHandler=(detail)=>{
    this.props.pushLocationUpdate(detail);
  }

  onDeleteClickedHandler=(id, title)=>{
    this.props.showDeleteConfirmationDialog(id,title);
  }

  showLoginOverlay=(users)=>
    <Overlay showHeader={false}>
      <Login onLoginClicked={this.onLoginClickedHandler} users={users}/>
    </Overlay>

  showConfirmOverlay=(message, id)=>
    <Overlay showHeader={true} onHide={this.hideDeleteDialogHandler}>
       <Dialog id={id} 
               message={message}
               onContinue={this.onDeleteContinueClickedHandler}
               onCancel={this.onDeleteCancelClickHandler}/>
    </Overlay>

  onErrorCancel=()=>
    this.props.hideNetworkError()

  onInvalidAddressClose=()=>
    this.props.hideInvalidAddress();

  showNetworkErrorOverlay = (message) =>
    <Overlay>
      <ErrorInfo message={message}
                 onCancel={this.onErrorCancel}></ErrorInfo>
    </Overlay>

  showInvalidAddressEntered = (message) =>
    <Overlay>
      <LocationInfo message={message}
                    onClose={this.onInvalidAddressClose}></LocationInfo>
    </Overlay>
  
  onDeleteContinueClickedHandler = (id) =>{
    this.props.deleteUserLocation(id);
  }

  onDeleteCancelClickHandler = () => {
    this.props.hideDeleteConfirmationDialog();
  }

  render() {
    const {locations, 
            location, 
            leftSideBarToggle, 
            rightSideBarToggle, 
            addressSuggestions, 
            locationUpdate, 
            isNewDetail, 
            token, 
            users,
            username,
            showDeleteConfirmation,
            dialog_location_id,
            delete_dialog_message,
            networkError,
            networkErrorMessage,
            invalidAddress,
            invalidAddressMessage} = this.props;

    return  <div>
              {showDeleteConfirmation ? this.showConfirmOverlay(delete_dialog_message, dialog_location_id):''}
              {token.length ? '' : this.showLoginOverlay(users)}
              {networkError ? this.showNetworkErrorOverlay(networkErrorMessage) : ''}
              {invalidAddress ? this.showInvalidAddressEntered(invalidAddressMessage) : ''}

              <LeftSideBar locations={locations} 
                       showSideBar={leftSideBarToggle} 
                       onSearchChange={this.onSearchChangeHandler}
                       locationWidgetClick={this.locationWidgetClickHandler}
                       onAddClicked={this.onAddClickedHandler}
                       username={username} 
                       onLogout={this.onLogoutHandler}/>
              <div className='content'>
                <Router>
                  <div>   
                    <Route path='/' exact component={LocationContainer}/> 
                  </div>
                </Router>
              </div>
              <RightSideBar 
                      showSideBar={rightSideBarToggle} 
                      fetchAddressSuggestion={this.fetchAddressSuggestion}
                      clearAddressSuggestion={this.clearAddressSuggestion}
                      addressSuggestions={addressSuggestions}
                      isUpdate={locationUpdate}
                      location={location}
                      currentLocationState={this.currentLocationState}
                      onClose={this.onCloseRightSideBar}
                      isNewDetail={isNewDetail}
                      onUpdate={this.onUpdateClickedHandler}
                      onDelete={this.onDeleteClickedHandler}
              />
          </div>
  }
}

const mapStateToProps = state =>{
  return {
     module : state.app.module,
     leftSideBarToggle: state.app.leftSideBarToggle,
     rightSideBarToggle: state.app.rightSideBarToggle,
     locations: state.locations.locations,
     addressSuggestions: state.geo.suggestions,
     locationUpdate: state.app.isLocationUpdate,
     location: state.locations.selectedLocation,
     isNewDetail: state.locations.isNewLocation,
     token: state.app.token,
     users: state.app.users,
     username: state.app.username,
     showDeleteConfirmation: state.app.showDeleteConfirmation,
     dialog_location_id: state.app.dialog_location_id,
     dialog_location_title: state.app.dialog_location_title,
     delete_dialog_message: state.app.delete_dialog_message,
     networkError: state.app.networkError,
     networkErrorMessage: state.app.networkErrorMessage,
     invalidAddressMessage: state.app.invalidAddressMessage,
     invalidAddress: state.app.invalidAddress
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setModule:(module) => dispatch(appAction.setModule(module)),
    showLeftSideBar:() => dispatch(appAction.showLeftSideBar()),
    hideLeftSideBar:() => dispatch(appAction.hideLeftSideBar()),
    showRightSideBar:() => dispatch(appAction.showRightSideBar()),
    hideRightSideBar:() => dispatch(appAction.hideRightSideBar()),
    loadLocations:() => dispatch(fetchLocations()),
    selectedLocation:(id) => dispatch(widgetSelectedLocation(id)),
    searchLocation:(value) => dispatch(searchLocation(value)),
    fetchAddress:(value) => dispatch(geoAction.fetchAddressSearch(value)),
    isLocationUpdate:()=>dispatch(appAction.isLocationUpdate()),
    isNotLocationUpdate:()=>dispatch(appAction.isNotLocationUpdate()),
    updateCurrentLocation: (location)=>dispatch(updateCurrentLocation(location)),
    clearAddressSuggestion:()=>dispatch(geoAction.clearAddressSuggestions()),
    initNewLocation:()=>dispatch(initNewLocation()),
    loadUsers:()=>dispatch(appAction.fetchAllUsers()),
    getSession: (user_id)=>dispatch(appAction.acquireSession(user_id)),
    logout:()=>dispatch(appAction.userLogout()),
    pushLocationUpdate:(location)=>dispatch(pushLocationUpdate(location)),
    showDeleteConfirmationDialog: (id, title)=>dispatch(appAction.showDeleteConfirmation(id,title)),
    hideDeleteConfirmationDialog: ()=>dispatch(appAction.hideDeleteConfirmation()),
    deleteUserLocation:(id)=>dispatch(deleteLocation(id)),
    hideNetworkError: ()=>dispatch(appAction.closeNetworkError()),
    hideInvalidAddress: ()=>dispatch(appAction.invalidAddressClose())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);