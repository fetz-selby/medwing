import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import SideBar from './components/sidebar/SideBar';
import AppBar from './components/appbar/AppBar';
import LocationContainer from './containers/location/LocationContainer';
import * as appRoute from './store/actions/appRoute';
import * as appAction from './store/actions/appActionCreators';
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

  initApp = (module, url) => {
    this.props.setModule(module);
    this.props.hideSideBar();
    this.redirect(url);
  }

  redirect = (path) => window.location.href = path;

  sideBarToggleClickedHandler = () => {
    this.props.showSideBar();
  }

  render() {
    // Set default username for test purposes
    const user = {username: 'Patricia Kasse', avatar: '/assets/avatars/antonio.svg'};

    return <div>
              <SideBar showSideBar={this.props.sideBarToggle} menuEvent={this.menuEventHandler}/>
              <div className='content'>
                <AppBar title={this.props.module}
                        username={user.username} 
                        avatar={user.avatar} 
                        sideBarToggleClicked={this.sideBarToggleClickedHandler}/>
                <Router>
                  <div>   
                      {/*Show Contacts Page as default  */}
                    <Route path='/' exact component={LocationContainer}/> 
                    <Route path='/app/contacts' exact component={LocationContainer}/>
                  </div>
                </Router>
              </div>
          </div>
    
  }
}

const mapStateToProps = state =>{
  return {
     module : state.app.module,
     sideBarToggle: state.app.sideBarToggle
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    setModule : (module) => dispatch(appAction.setModule(module)),
    showSideBar : () => dispatch(appAction.showSideBar()),
    hideSideBar : () => dispatch(appAction.hideSideBar())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
