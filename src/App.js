import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import LeftSideBar from './components/sidebar/left';
import RightSideBar from './components/sidebar/right';
import LocationContainer from './containers/location/LocationContainer';
import * as appRoute from './store/actions/app/appRoute';
import * as appAction from './store/actions/app/appActionCreators';
import * as geoAction from './store/actions/geo/geoActionCreators';
import {fetchLocations, widgetSelectedLocation, searchLocation} from './store/actions/locations/locationActionCreators';
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
  }

  onSearchChangeHandler = (event) =>{
    this.props.searchLocation(event.target.value);
  }

  fetchAddressSuggestion=(address)=>{
    this.props.fetchAddress(address);
  }

  clearAddressSuggestion=()=>{
    console.log('Clear suggestions');
  }

  render() {
    const {locations, location, sideBarToggle, addressSuggestions, locationUpdate} = this.props;
    return <div>
              <LeftSideBar locations={locations} 
                       showSideBar={sideBarToggle} 
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
                      showSideBar={sideBarToggle} 
                      fetchAddressSuggestion={this.fetchAddressSuggestion}
                      clearAddressSuggestion={this.clearAddressSuggestion}
                      addressSuggestions={addressSuggestions}
                      isUpdate={locationUpdate}
                      location={location}
              />
          </div>
    
  }
}

const mapStateToProps = state =>{
  return {
     module : state.app.module,
     sideBarToggle: state.app.sideBarToggle,
     locations: state.locations.locations,
     addressSuggestions: state.geo.suggestions,
     locationUpdate: state.app.isLocationUpdate,
     location: state.locations.selectedLocation
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setModule : (module) => dispatch(appAction.setModule(module)),
    showSideBar : () => dispatch(appAction.showSideBar()),
    hideSideBar : () => dispatch(appAction.hideSideBar()),
    loadLocations : () => dispatch(fetchLocations()),
    selectedLocation : (id) => dispatch(widgetSelectedLocation(id)),
    searchLocation: (value) => dispatch(searchLocation(value)),
    fetchAddress: (value) => dispatch(geoAction.fetchAddressSearch(value)),
    isLocationUpdate:()=>dispatch(appAction.isLocationUpdate())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
