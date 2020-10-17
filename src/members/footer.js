import React from 'react';
import './footer.css';
import image from '../images/nal-navbar.png';

const footer = () =>{
        const NAV_LINKS_NAME = ["Diversity","Community","Post A Job","Get Hired","Join Communit"]
        return(
            <div className="footerMainContainer">
                <img className="footerIcon" src={image}/>
                <div className="footerSubContainer">
                    {
                        NAV_LINKS_NAME.map((name,key)=>(
                            <label className="footerItem" key={key}>{name}</label>
                        ))
                    }
                </div>
            </div>
        )
}

export default footer