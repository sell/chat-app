import React, {Component} from "react";
import axios from 'axios';
import '../app.css'
import { FiSend } from 'react-icons/fi'
class Home extends Component {
    state = {
        username: '',
        password: '',
        login: false,
        store: null,
        message: '',
        messages: [],
        hasError: false
    }

    async componentDidMount() {
        this.storeCollector()

    }

    storeCollector() {
        let store = JSON.parse(localStorage.getItem('login'))
        if (store && store.login) {
            this.setState({
                login: true,
                store: store
            })
        }
    }
    usernameChange = (e) => {
        this.setState({ username: e.target.value})
    }

    passwordChange = (e) => {
        this.setState({ password: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const backend = 'http://localhost:5000/api/user/login';
        await axios.post(backend, {
            username: this.state.username,
            password: this.state.password
        }).then(async (res) => {
            console.log(res.data)
            localStorage.setItem('login', JSON.stringify({
                login: true,
                token: res.data.token,
                user: this.state.username
            }))
            this.storeCollector()
            let token = "Bearer " + this.state.store.token
            const backendMessages = 'http://localhost:5000/api/message';

            const response = await axios.get(backendMessages, {
                headers: {
                    'Authorization': token
                }
            })
            const data = await response.data
            this.setState({
                messages: data
            })

            console.log(data)

        }).catch(() => {
            this.setState({ hasError: true })
        })
    }

    messageChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }

    handleMessageSubmit = async (e) => {
        e.preventDefault()

        let token = "Bearer " + this.state.store.token
        const backendMessages = 'http://localhost:5000/api/message';
        const headers = {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
        const user = JSON.parse(localStorage.getItem('login'))

        axios.post(backendMessages, {
            user: user.user,
            message: this.state.message
        }, {
            headers
        }).then((res) => {
            console.log(res.data)
        }).catch(e => {
            console.log(e)
        })

        setInterval( async () => {
            const response = await axios.get(backendMessages, {
                headers: {
                    'Authorization': token
                }
            })
            const data = await response.data
            this.setState({
                messages: data
            })

        }, 333)
    }

    render() {
        const { handleSubmit, usernameChange, passwordChange, state: {
            username, password
        }} = this

        const { messageChange, handleMessageSubmit, state: {
            message
        }} = this



        const user = JSON.parse(localStorage.getItem('login'))
        return (
            <fragment>
                <div className={"container"}>
                    {
                        !this.state.login?
                            <div>
                                {this.state.hasError ? <h1>Username or password is incorrect</h1> : ''}
                                <h1>Login</h1>
                                <form onSubmit={handleSubmit}>
                                <input type={"username"} placeholder={"username"} onChange={usernameChange} value={username}/>
                                <input type={"password"} placeholder={"password"} onChange={passwordChange} value={password}/>
                                <button type={"submit"}>Login In</button>
                                </form>
                            </div>
                        :
                        <div>
                            <p style={{textAlign: 'center'}}>UPDATED IN REAL TIME!</p>
                            <div className={"MessageForm"}>
                                <h2>Hello, {user.user}!</h2>
                                <form onSubmit={handleMessageSubmit}>
                                    <input type={"text"} placeholder={"message"} onChange={messageChange} value={message} />

                                    <button type={"submit"}>
                                        Send Message <FiSend/>
                                    </button>
                                </form>
                            </div>
                            <div>
                                <div className={"test"}>
                                    {
                                        this.state.messages.map(message => {
                                            return (
                                                <div>
                                                    <p key={`${message._id}`}>{message.user}
                                                        : <span key={`${message._id}`}>{message.message}</span>
                                                    </p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </fragment>
        )
    }
}

export default Home;