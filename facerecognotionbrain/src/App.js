import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "react-particles-js";
import "tachyons";
import "./App.css";
import FaceRecognition from "./components/FaceRecogintion/FaceRecognition";
import SignIn from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import { ParticlesOptions } from "tsparticles/Options/Classes/Particles/ParticlesOptions";


// options of Particles mode
const particlesOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        value_area:900,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}






// this is out initial state that we use to reset our state each time the user sign out
const initialState = {
  input: " ",
  imageURL: "",
  box: "",
  route: "signin",
  // we are creating this state to manipulate the navigation bar according to the status of the routes
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  }
}


class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  // updating user profile
  // data is the data of the user recieved from the database
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  calculateFaceLoaction = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - (data.right_col * width),
      bottomRow: height - (data.bottom_row * height),
    }

  }
  // the box that appears as CSS to suuround the face of the image
  displayFace = (box) => {
    this.setState({ box: box })

  }

  onPictureSubmit = (event) => {
    this.setState({ imageURL: this.state.input })
    fetch("https://whispering-fjord-72948.herokuapp.com/imageURL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://whispering-fjord-72948.herokuapp.com/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          }).then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            // catching any error coming from our fetch response
            // quick way to catch error same as  .catch(err=>console.log(err))
            .catch(console.log);
        }
        this.displayFace(this.calculateFaceLoaction(response.outputs[0].data.regions[0].region_info.bounding_box))
      })

      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === "signout") {
      // we reset our state to the initialState each time the user sign out 
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }





  render() {

    // Initializing particles  
    const particlesInit = (main) => {
      console.log(main);
    };

    const particlesLoaded = (container) => {
      console.log(container);
    };

    return (

      <div div className="App" >
        <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} route={this.state.route} />
        {
          (this.state.route === "Register") ?
            <div>
              <Logo />
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
            :
            (this.state.route === "home") ?
              <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
                <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
              </div>
              :
              <div>
                <Logo />
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>
        }
      </div >
    )

  }
}

export default App;
