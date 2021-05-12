import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from 'react-particles-js';
import "tachyons";
import "./App.css";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecogintion/FaceRecognition";
import SignIn from "./components/Signin/Signin";
import Register from "./components/Register/Register";

const particlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const app = new Clarifai.App({
  apiKey: "d571468358fb4c82a8da41ff41100d1e"
})

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: " ",
      imageURL: "",
      box:"",
      route: "signin",
      isSignedIn: false,
    }
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  calculateFaceLoaction=(data)=>{
    const image=document.getElementById("inputImage");
    const width=Number(image.width);
    const height=Number(image.height);
    console.log(data)

    return {
    leftCol:data.left_col * width,
    topRow:data.top_row * height,
    rightCol:width-(data.right_col * width),
    bottomRow:height-(data.bottom_row *height),
    }
    
  }

  displayFace=(box)=>{
    this.setState({box:box})
    
  }

  onButtonSubmit = (event) => {
    this.setState({ imageURL: this.state.input })
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
        // this is the boundry_box
      .then(response=>this.displayFace(this.calculateFaceLoaction(response.outputs[0].data.regions[0].region_info.bounding_box)))
      
      .catch(err=>console.log(err))
  }

  onRouteChange=(route)=>{
    if(route==="signout"){
      this.setState({isSignedIn:false})
    }else if(route==="home"){
      this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  }

  
      render(){
    return(
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
          { (this.state.route=== "Register") ?
            <div>
            <Logo />
            <Register onRouteChange={this.onRouteChange} />
            </div>
            : 
            (this.state.route=== "home") ?
              <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
              </div>
            :
              <div>
              <Logo />
              <SignIn onRouteChange={this.onRouteChange} />
              </div>
          }   
      </div>
    )
    
  }
}

export default App;
