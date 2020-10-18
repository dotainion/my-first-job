import React from 'react';
import './hamburgerMenu.css';

export const MenuIcon = (data) =>{
    return(
        <div className="menu-button-container" onClick={()=>{if (data.onClick) data.onClick();}}>
            <div className="menu-button-line"></div>
            <div className="menu-button-line"></div>
            <div className="menu-button-line"></div>
        </div>
    )
}