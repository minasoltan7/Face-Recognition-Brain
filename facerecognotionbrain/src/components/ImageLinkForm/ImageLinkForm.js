import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 center text">
                {"This Magic Brain Will Detect Faces In Your Pictures. Give it a Try"}
            </p>
            <div className="center ImageLinkForm">
                <input type="text" className="f4 pa2 w-70 center urlHolder" onChange={onInputChange} />
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit} >Detect</button>
            </div>
        </div>

    )
}



export default ImageLinkForm;