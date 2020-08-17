import React, {Component} from "react";
import axios from 'axios';

class Home extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    usernameChange = (e) => {
        this.setState({ username: e.target.value})
    }

    emailChange = (e) => {
        this.setState({ email: e.target.value})
    }

    passwordChange = (e) => {
        this.setState({ password: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const backend = 'http://localhost:5000/api/user/register';
        await axios.post(backend, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
    }
    render() {
        const { handleSubmit, usernameChange, emailChange, passwordChange, state: {
            username, email, password
        }} = this
        return (
            <div className={"container"}>
                <div className={"signupForm"}>
                    <h1>Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <input type={"username"} onChange={usernameChange} placeholder={"username"} value={username}/>
                        <input type={"email"} onChange={emailChange} placeholder={"email"} value={email}/>
                        <input type={"password"} onChange={passwordChange} placeholder={"password"} value={password}/>
                        <button type={"submit"}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Home;