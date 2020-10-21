import React, { useState } from 'react';
import './login.css';
import Footer from '../components/footer';
import { FirebaseAuth, FIRE_BASE } from '../modules/auth/loginAndRegisterService';
import { Link } from 'react-router-dom';
import { DropDownMenu, Header } from '../components/header';
import firebase from 'firebase';
import { login } from '../modules/config/authRouter';


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
            /*const response = await auth.login(inputData.email,inputData.password);
            console.log(response)
            if (response.state) setErrorMsg("You are sign in");
            else setErrorMsg(response.message);*/
            login(data.email, data.password)

        }
    }
    return(
        <div className="main-container-login-background">
            <div className="sub-container-login-background">
                <Header onClickMenu={()=>{openMobilDropDown()}}/>

                <div className="login-container">
                    <DropDownMenu down={dropDownState}/>

                    <Link to="/signup">
                        <label className="login-create-btn login-create-btn-hover">Don't Have an Account? Click Here</label>
                    </Link>

                    <div className="">
                        <label className="login-input-label">Email Address</label>
                        <div><input type="email" maxLength="256" onChange={(e)=>{
                            setInputData({email:e.target.value,password:inputData.password});
                        }} className="login-input login-input-focus"/></div>
                    </div>
                    <div className="">
                        <label className="login-input-label">Password</label>
                        <div><input type="password" maxLength="256" onChange={(e)=>{
                            setInputData({email:inputData.email,password:e.target.value});
                        }} className="login-input login-input-focus"/></div>
                    </div>
                    <div className="login-button-and-error-container">
                        <button className="login-btn login-btn-focus login-btn-onclick" onClick={()=>{inputesCheck(inputData);}}>Sign In</button>
                        <label className="login-error-label">{errorMsg}</label>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login;