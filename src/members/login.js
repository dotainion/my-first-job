import React, { Component } from 'react';
import './login.css';
import image from '../images/nal-navbar.png';
import bg_image from '../images/Wave_Compressed_2.png';
import Footer from './footer';



class Login extends Component{
    render(){    
        return(
            <div>
                <div className="mainContainer" style={{backgroundImage:`url(${bg_image})`}}>
                    <img className="mainIcon" src={image}/>

                    <div className="topButtonContainer">
                        <label className="communityButtons communityHover">Community</label>
                        <label className="createAccountButtons createAccountHover">Create Account</label>
                    </div>

                    <div className="loginInputscontainer">
                        <label className="createAccountButton">Don't Have an Account? Click Here</label>

                        <div className="subcontainers">
                            <label className="labels">Email Address</label>
                            <div><input className="inputs inputsFocus"/></div>
                        </div>
                        <div className="subcontainers">
                            <label className="labels">Password</label>
                            <div><input className="inputs inputsFocus"/></div>
                        </div>
                        <div className="subcontainers">
                            <button className="singInButton onsignInClick singInButtonFocus">Sign In</button>
                        </div>
                    </div>
                    
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Login;