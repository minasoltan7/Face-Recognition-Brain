import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
    return (
        <div className="Tilt">
            <Tilt tiltReverse={true} reset={false} tiltMaxAngleX={50} tiltMaxAngleY={50}>
                <div>
                    <h1><img className="brainIcon br2 shadow-2" src={brain} alt="logo"></img></h1>
                </div>
            </Tilt>
        </div>

    )
}



export default Logo;