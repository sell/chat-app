import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

class Header extends Component {
    state = {
        login: false,
        store: null,
    }
    handleLogoutSubmit = () => {
        localStorage.clear()
    }
    render() {
        const { handleLogoutSubmit } = this
        return (
            <header>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Link className="navbar-brand" to="/">
                        Terrible Chat
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                            <Link className="nav-link" to="/chat">
                                Chat
                            </Link>
                        </Nav>
                        <Nav>
                            {handleLogoutSubmit ?
                                <form onSubmit={handleLogoutSubmit}>
                                    <button>
                                        Logout
                                    </button>
                                </form>
                                : 'login'
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        )
    }
}

export default Header;