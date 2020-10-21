import React, { useState } from 'react';
import './header.css';
import nal_image from '../images/Image-from-iOS.png';

export const Header = (data) =>{
    return(
        <div >
            <img className="nal-image" src={nal_image}/>
            <div className="menu-button-container" onClick={()=>{if (data.onClickMenu) data.onClickMenu();}}>
                <div className="menu-button-line"></div>
                <div className="menu-button-line"></div>
                <div className="menu-button-line"></div>
            </div>
            <nav role="navigation" className="header-button-container">
                <label className="header-comunity communityHover">Community</label>
                <label className="header-create-account createAccountHover">Create Account</label>
            </nav>
        </div>
    )
}
export const DropDownMenu = (data) =>{
    return(
        <div hidden={!data.down} className="header-dropdown-menu-container">
            <div className="header-dropdown-menu">Community</div>
            <div className="header-dropdown-menu">Create Account</div>
        </div>
    )
}