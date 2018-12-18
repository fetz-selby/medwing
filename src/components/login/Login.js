import React from 'react';
import PropTypes from 'prop-types';
import './login.css';
import icon from '../../assets/icons/user.png';

const LoginWidget = (props)=>
    <div className='login' onClick={()=>props.onLoginClicked(props.id)}>
        <div className='login-widget-container'>
            <div className='avatar-container'>
                {/* <img src={props.avatar} alt={props.name}/> */}
                <img className='avatar' src={icon} alt={props.name}/>
            </div>
            <div className='info-container'>
                <div className='info'>{props.name}</div>
            </div>
            
        </div>
        <div className='clearfix'></div>
    </div>

const Login = (props) =>
    <div className='login-container'>
        {props.users.map((user)=>
            <LoginWidget key={user.id} 
                        id={user.id} 
                        name={user.name} 
                        avatar={user.avatar} 
                        onLoginClicked={props.onLoginClicked}/>
            )}
    </div>


Login.propTypes = {
    showHeader: PropTypes.bool,
    onLoginClicked: PropTypes.func,
    users: PropTypes.array
}

export default Login;