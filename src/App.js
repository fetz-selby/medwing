import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import LeftSideBar from './components/sidebar/left';
import RightSideBar from './components/sidebar/right';
import LocationContainer from './containers/location/LocationContainer';
import * as appRoute from './store/actions/app/appRoute';
import * as appAction from './store/actions/app/appActionCreators';
import * as geoAction from './store/actions/geo/geoActionCreators';
import {fetchLocations, widgetSelectedLocation, searchLocation, updateCurrentLocation} from './store/actions/locations/locationActionCreators';
import './assets/styles/layout.css';
import './assets/styles/reset.css';

class App extends Component {

  menuEventHandler = (val) => {
    switch(val){
      case appRoute.MY_LOCATIONS.module:{
        this.initApp(appRoute.MY_LOCATIONS.module, appRoute.MY_LOCATIONS.path);
        break;
      }
      default:{

      }
    }
  }

  componentDidMount(){
    this.props.loadLocations();
  }

  initApp = (module, url) => {
    this.props.setModule(module);
    this.props.hideSideBar();
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
    console.log('Close me!');
    this.props.hideRightSideBar();
  }

  fetchAddressSuggestion=(address)=>{
    this.props.fetchAddress(address);
  }

  clearAddressSuggestion=()=>{
    console.log('Clear suggestions');
    this.props.clearAddressSuggestion();
  }

  currentLocationState=(location)=>{
    this.props.updateCurrentLocation(location);
  }

  render() {
    const {locations, location, leftSideBarToggle, rightSideBarToggle, addressSuggestions, locationUpdate} = this.props;
    console.log('RightSideBarToggle => '+rightSideBarToggle);
    return <div>
              <LeftSideBar locations={locations} 
                       showSideBar={leftSideBarToggle} 
                       onSearchChange={this.onSearchChangeHandler}
                       locationWidgetClick={this.locationWidgetClickHandler}/>
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
     location: state.locations.selectedLocation
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setModule : (module) => dispatch(appAction.setModule(module)),
    showLeftSideBar : () => dispatch(appAction.showLeftSideBar()),
    hideLeftSideBar : () => dispatch(appAction.hideLeftSideBar()),
    showRightSideBar : () => dispatch(appAction.showRightSideBar()),
    hideRightSideBar : () => dispatch(appAction.hideRightSideBar()),
    loadLocations : () => dispatch(fetchLocations()),
    selectedLocation : (id) => dispatch(widgetSelectedLocation(id)),
    searchLocation: (value) => dispatch(searchLocation(value)),
    fetchAddress: (value) => dispatch(geoAction.fetchAddressSearch(value)),
    isLocationUpdate:()=>dispatch(appAction.isLocationUpdate()),
    updateCurrentLocation: (location)=>dispatch(updateCurrentLocation(location)),
    clearAddressSuggestion:()=>dispatch(geoAction.clearAddressSuggestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
