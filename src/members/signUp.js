import React, { useState } from 'react';
import './login-signup.css';
import image from '../images/Image-from-iOS.png';
import Footer from './footer';
import { MenuIcon } from './hamburgerMenu';
import { FirebaseAuth } from '../modules/auth/loginAndRegisterService';
import { Link } from 'react-router-dom';

const auth = new FirebaseAuth();
const SignUp = () =>{
    const [dropDownState, setDropDownState] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [radioBtn, setRadioBtn] = useState({creative:false,creativeBg:"",recruiter:false,recruiterBg:""});
    const [inputData, setInputData] = useState({name:"",email:"",password:"",verifypassword:""});

    const radioBgColor = "rgb(168, 94, 168)";

    const openMobilDropDown = () =>{
        if (dropDownState) setDropDownState(false);
        else setDropDownState(true);
    }

    const inputesCheck = async (data) =>{
        setErrorMsg("");
        let STATE = true;
        const input_keys = Object.keys(data);
        for (var key of input_keys){
            if (!data[key]){
                STATE = false;
                setErrorMsg("All Fields Required");
                break;
            }
        }
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (STATE){
            if (!regex.test(data.email)){
                STATE = false;
                setErrorMsg("Invalid Email");
            }
        }
        if (STATE){
            if (data.password !== data.verifypassword){
                STATE = false;
                setErrorMsg("Password Mismatch");
            }
        }
        if (STATE){
            const response = await auth.register(inputData.email,inputData.password);
            console.log(response);
            if (response.state) setErrorMsg("account created");
            else setErrorMsg(response.message);
        }
    }

    return(
        <div className="main-main-container-background">
            <div className="main-main-container-singup">
                <div className="mainContainer">
                    <img className="nal-Icon" src={image}/>
                    <div className="menuIcon"><MenuIcon onClick={()=>{openMobilDropDown()}}/></div>
                    <nav role="navigation" className="topButtonContainer">
                        <label className="communityButtons communityHover">Community</label>
                        <label className="createAccountButtons createAccountHover">Create Account</label>
                    </nav>

                    <div className="inputsContainerSignup">
                        <div hidden={!dropDownState} className="drop-down-menu-container">
                            <div className="drop-down-menu-item">Community</div>
                            <div className="drop-down-menu-item">Create Account</div>
                        </div>

                        <Link to="/login"><label className="createAccountButton labelHover">Already have an account? Sign In</label></Link>

                        <div className="radioButtonContainer">
                            <span className="radioButtonText" onClick={(e)=>{
                                setRadioBtn({creative:true,creativeBg:radioBgColor,recruiter:false,recruiterBg:""});
                            }}><input style={{backgroundColor:radioBtn.creativeBg}} className="radioButton" type="radio"/>Creative</span>
                            <span className="radioButtonText" onClick={(e)=>{
                                setRadioBtn({creative:false,creativeBg:"",recruiter:true,recruiterBg:radioBgColor});
                            }}><input style={{backgroundColor:radioBtn.recruiterBg}} className="radioButton" type="radio"/>Recruiter</span>
                        </div>

                        <div className="subcontainers">
                            <label className="labels">Name</label>
                            <div><input type="text" maxLength="256" onChange={(e)=>{
                                setInputData({
                                    name:e.target.value,
                                    email:inputData.email,
                                    password:inputData.password,
                                    verifypassword:inputData.verifypassword
                                });
                            }} className="inputs inputsFocus"/></div>
                        </div>
                        <div className="subcontainers">
                            <label className="labels">Email Address</label>
                            <div><input type="email" maxLength="256" onChange={(e)=>{
                                setInputData({
                                    name:inputData.name,
                                    email:e.target.value,
                                    password:inputData.password,
                                    verifypassword:inputData.verifypassword
                                });
                            }} className="inputs inputsFocus"/></div>
                        </div>
                        <div className="subcontainers">
                            <label className="labels">Password</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                                setInputData({
                                    name:inputData.name,
                                    email:inputData.email,
                                    password:e.target.value,
                                    verifypassword:inputData.verifypassword
                                });
                            }} className="inputs inputsFocus"/></div>
                        </div>
                        <div className="subcontainers">
                            <label className="labels">Verify Password</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                                setInputData({
                                    name:inputData.name,
                                    email:inputData.email,
                                    password:inputData.password,
                                    verifypassword:e.target.value});
                            }} className="inputs inputsFocus"/></div>
                        </div>
                        <div className="subcontainers">
                            <button className="singInButton onsignInClick singInButtonFocus" onClick={()=>{
                                inputesCheck(inputData);
                            }}>Next</button>
                            <label className="singIn-error">{errorMsg}</label>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default SignUp;