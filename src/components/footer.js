import React from 'react';
import './footer.css';
import nal_icon from '../images/Image-from-iOS.png';
import twiter_icon from '../images/23931.png';
import instagram_icon from '../images/IG_Logo.png';

const footer = () =>{
        const NAV_LINKS_NAME = ["Diversity","Community","Post A Job","Get Hired","Join Communit"]
        return(
            <div className="footerMainContainer">
                <img className="footer-nal-icon" src={nal_icon}/>
                <div className="footerIconContainer">
                    <img className="footerTwiterIcon footerIconHover" src={twiter_icon}/>
                    <img className="footerInstagramIcon footerIconHover" src={instagram_icon}/>
                </div>
                <div className="footerSubContainer">
                    {
                        NAV_LINKS_NAME.map((name,key)=>(
                            <label className="footerItem labelHover" key={key}>{name}</label>
                        ))
                    }
                </div>
            </div>
        )
}

export default footer