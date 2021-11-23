import React from "react";



class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            registerEmail: "",
            registerPassword: '',
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value })
        console.log(event.target.value)
    }

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
    }

    onRegisterButton = (event) => {
        fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        }).then(res => res.json())
            .then(user => {
                if (user) {
                    this.props.loadUser(user);
                    this.props.onRouteChange("home");
                } else {
                    console.log("didn't receive a user");
                }
            })

    }

    render() {
        return (
            <article class="br2 ba shadow-5 br3 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <form className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0 center">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onRegisterButton} className="b ph3 pv2 input-reset ba b--black  center bg-transparent grow pointer f5 dib" type="submit" value="Register" />
                        </div>
                    </form>
                </main>
            </article>
        )
    }

}

export default Register;