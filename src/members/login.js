import React, { useState } from 'react';
import './login-signup.css';
import image from '../images/Image-from-iOS.png';
import Footer from '../components/footer';
import { MenuIcon } from '../components/hamburgerMenu';
import { FirebaseAuth } from '../modules/auth/loginAndRegisterService';
import { Link } from 'react-router-dom';

const auth = new FirebaseAuth();
const Login = () =>{
    const [dropDownState, setDropDownState] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [inputData, setInputData] = useState({email:"",password:""});

    const openMobilDropDown = () =>{
        if (dropDownState) setDropDownState(false);
        else setDropDownState(true);
    }

    const inputesCheck = async(data) =>{
        let msg = "";
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (data.password === "" && data.email === "" || !regex.test(data.email)) msg = "Invalid Email and Password";
        else if (!data.email || !regex.test(data.email)) msg = "Invalid Email";
        else if (!data.password) msg = "Invalid Password";
        setErrorMsg(msg);
        if (!msg){
            const response = await auth.login(inputData.email,inputData.password);
            console.log(response)
            if (response.state) setErrorMsg("You are sign in");
            else setErrorMsg(response.message);

        }
    }
    return(
        <div className="main-main-container-background">
            <div className="main-main-container-login">
                <div className="mainContainer">
                    <img className="nal-Icon" src={image}/>
                    <div className="menuIcon"><MenuIcon onClick={()=>{openMobilDropDown()}}/></div>
                    <nav role="navigation" className="topButtonContainer">
                        <label className="communityButtons communityHover">Community</label>
                        <label className="createAccountButtons createAccountHover">Create Account</label>
                    </nav>

                    <div className="inputsContainerLogin">
                        <div hidden={!dropDownState} className="drop-down-menu-container">
                            <div className="drop-down-menu-item">Community</div>
                            <div className="drop-down-menu-item">Create Account</div>
                        </div>

                        <Link to="/signup"><label className="createAccountButton labelHover">Don't Have an Account? Click Here</label></Link>

                        <div className="subcontainers">
                            <label className="labels">Email Address</label>
                            <div><input type="email" maxLength="256" onChange={(e)=>{
                                setInputData({email:e.target.value,password:inputData.password});
                            }} className="inputs inputsFocus"/></div>
                        </div>
                        <div className="subcontainers">
                            <label className="labels">Password</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                                setInputData({email:inputData.email,password:e.target.value});
                            }} className="inputs inputsFocus"/></div>
                        </div>
                        <div className="subcontainers">
                            <button className="singInButton onsignInClick singInButtonFocus" onClick={()=>{inputesCheck(inputData);}}>Sign In</button>
                            <label className="singIn-error">{errorMsg}</label>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Login;