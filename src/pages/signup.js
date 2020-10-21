import React, { useState } from 'react';
import './signup.css';
import Footer from '../components/footer';
import { FirebaseAuth } from '../modules/auth/loginAndRegisterService';
import { Link } from 'react-router-dom';
import { DropDownMenu, Header } from '../components/header';

const auth = new FirebaseAuth();
const SignUp = () =>{
    const [dropDownState, setDropDownState] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [radioBtn, setRadioBtn] = useState({creative:false,creativeBg:"",recruiter:false,recruiterBg:""});
    const [inputData, setInputData] = useState({name:"",email:"",password:"",verifypassword:""});

    const radioBgColor = "rgb(168, 94, 168)";

    const GENDER_LIST = [
        "Female",
        "Male",
        "transgender Femle",
        "Transgender Male",
        "Gender Variant/Non-Conforming",
        "Not Listed",
        "Prefer Not to Answer",
    ]
    const PRONOUNS_LIST = [ 
        "She/Her",
        "He/Him",
        "The/Them",
    ]
    const VET_STATUS_LIST = [
        "Decline to Identify",
        "Disabled Veteran",
        "Recently seperated Veteran",
        "Active Duty, wartime, or Campaign badge Veteran",
        "Armed Forced service medal Veteran",
        "One or more classifications or protected Veterans",
        "Other protected Veteran",
        "I am not a Veteran",
    ]
    const DISABILITIES_LIST = [
       " I Don't Wish To Answer",
        "Yes, I Have Disability, Or A History/Record Of Having A Disability",
    ]

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
        <div className="main-container-signup-background">
            <div className="sub-container-signup-background">
                <Header onClickMenu={()=>{openMobilDropDown()}}/>

                <div className="signup-container">
                    <DropDownMenu down={dropDownState}/>

                    <Link to="/login">
                        <label className="signup-create-btn signup-create-btn-hover">Already have an account? Sign In</label>
                    </Link>

                    <div className="radioButtonContainer">
                        <span className="radioButtonText" onClick={(e)=>{
                            setRadioBtn({creative:true,creativeBg:radioBgColor,recruiter:false,recruiterBg:""});
                        }}><input style={{backgroundColor:radioBtn.creativeBg}} className="radioButton" type="radio"/>Creative</span>
                        <span className="radioButtonText" onClick={(e)=>{
                            setRadioBtn({creative:false,creativeBg:"",recruiter:true,recruiterBg:radioBgColor});
                        }}><input style={{backgroundColor:radioBtn.recruiterBg}} className="radioButton" type="radio"/>Recruiter</span>
                    </div>

                    <div className="signup-left-container">
                        <div className="">
                            <label className="signup-input-label">Name</label>
                            <div><input type="text" maxLength="256" onChange={(e)=>{
                                setInputData({
                                    name:e.target.value,
                                    email:inputData.email,
                                    password:inputData.password,
                                    verifypassword:inputData.verifypassword
                                });
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Email Address</label>
                            <div><input type="email" maxLength="256" onChange={(e)=>{
                                setInputData({
                                    name:inputData.name,
                                    email:e.target.value,
                                    password:inputData.password,
                                    verifypassword:inputData.verifypassword
                                });
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Password</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                                setInputData({
                                    name:inputData.name,
                                    email:inputData.email,
                                    password:e.target.value,
                                    verifypassword:inputData.verifypassword
                                });
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Verify Password</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                                setInputData({
                                    name:inputData.name,
                                    email:inputData.email,
                                    password:inputData.password,
                                    verifypassword:e.target.value});
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Country</label>
                            <div><input type="text" maxLength="256" onChange={(e)=>{
                            
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Zip Code</label>
                            <div><input type="email" maxLength="256" onChange={(e)=>{
                                
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Phone Number</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                            
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Professional Title</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                            
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                    </div>

                    <div className="signup-right-container">
                        <div className="">
                            <label className="signup-input-label">Industry</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                            
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Years of Experience</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                            
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Gender</label>
                            <select className="singup-input singup-input-focus">
                                {
                                    GENDER_LIST.map((item,key)=>(
                                        <option key={key}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Pronouns</label>
                            <select className="singup-input singup-input-focus">
                                {
                                    PRONOUNS_LIST.map((item,key)=>(
                                        <option key={key}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Website</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                            
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Education</label>
                            <div><input type="password" maxLength="256" onChange={(e)=>{
                            
                            }} className="singup-input singup-input-focus"/></div>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Vet Status</label>
                            <select className="singup-input singup-input-focus">
                                {
                                    VET_STATUS_LIST.map((item,key)=>(
                                        <option key={key}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="">
                            <label className="signup-input-label">Disabilities</label>
                            <select className="singup-input singup-input-focus">
                                {
                                    DISABILITIES_LIST.map((item,key)=>(
                                        <option key={key}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="signup-button-and-error-container">
                        <button className="signup-btn signup-btn-focus:focus signup-btn-onclick" onClick={()=>{
                            inputesCheck(inputData);
                        }}>Next</button>
                        <label className="signup-error-label">{errorMsg}</label>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SignUp;