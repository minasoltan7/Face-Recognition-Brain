import React from "react";



class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signInEmail: "",
            signInPassword: "",
        }
    }


    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
        console.log(event.target.value);
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
        console.log(event.target.value);
    }

    onSubmitButton = (event) => {
        fetch("http://localhost:4000/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            // we send our data in the body
            // we must add JSON.stringify() because data are going through HTTP wires
            // we cant send a javascript object to the backend 
            body: JSON.stringify(
                {
                    email: this.state.signInEmail,
                    password: this.state.signInPassword,
                }
            )
        },
            // we need to transform the JSON send from the backend to javascript so we use .json() built in function in javascript
        ).then(res => res.json())
        // we get all user info from the server side and then update our "user STATE" 
            .then(user => {
                // does the user exist? Did we receive a user with a property of id? If it is true it will sign in
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange("home")
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br2 ba shadow-5 br3 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center" >
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0 center">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitButton} className="b ph3 pv2 input-reset ba b--black  center bg-transparent grow pointer f5 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange("Register")} className="f6 link dim black db center pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }

}

export default SignIn;