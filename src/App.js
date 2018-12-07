import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import SideBar from './components/sidebar/SideBar';
import LocationContainer from './containers/location/LocationContainer';
import * as appRoute from './store/actions/appRoute';
import * as appAction from './store/actions/appActionCreators';
import {fetchLocations, widgetSelectedLocation} from './store/actions/locationActionCreators';
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
    this.redirect(url);
  }

  redirect = (path) => window.location.href = path;

  sideBarToggleClickedHandler = () => {
    this.props.showSideBar();
  }

  locationWidgetClickHandler = (id) => {
    console.log('id => '+id);
    this.props.selectedLocation(id);
  }

  onSearchChangeHandler = (event) =>{
    console.log(event.target.value);
  }

  render() {
    const {locations,sideBarToggle} = this.props;

    return <div>
              <SideBar locations={locations} 
                       showSideBar={sideBarToggle} 
                       onSearchChange={this.onSearchChangeHandler}
                       locationWidgetClick={this.locationWidgetClickHandler}/>
              <div className='content'>
                <Router>
                  <div>   
                      {/*Show Contacts Page as default  */}
                    <Route path='/' exact component={LocationContainer}/> 
                  </div>
                </Router>
              </div>
          </div>
    
  }
}

const mapStateToProps = state =>{
  return {
     module : state.app.module,
     sideBarToggle: state.app.sideBarToggle,
     locations: state.locations.locations
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setModule : (module) => dispatch(appAction.setModule(module)),
    showSideBar : () => dispatch(appAction.showSideBar()),
    hideSideBar : () => dispatch(appAction.hideSideBar()),
    loadLocations : () => dispatch(fetchLocations()),
    selectedLocation : (id) => dispatch(widgetSelectedLocation(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
