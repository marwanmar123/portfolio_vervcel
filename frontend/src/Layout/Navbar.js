import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useUser} from '../Context/UserContext'

function Navbar(props) {
    const {user} = useUser()
    const [cookies, ,removeCookie] = useCookies(["token"]);
    const isAuthenticated = cookies.token;
    const navigate = useNavigate();

    const logout = () => {
        removeCookie("token");
        navigate("/login");
    }


    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active text-light" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="#">Link</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-light" to="#" role="button"
                                  data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/">Action</Link></li>
                                <li><Link className="dropdown-item" to="/">Another action</Link></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><Link className="dropdown-item" to="/">Something else here</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <Link to="/contact">Contact</Link>
                        {isAuthenticated ? (
                            <div className="d-flex gap-4 align-items-center">
                                <Link to="/profile">hello: {user.username}</Link>
                                <button className="btn btn-secondary" onClick={logout}>logout</button>
                                <Link to="/dashboard" >Dashboard</Link>
                            </div>
                        ) : (
                            <div className="d-flex gap-4 align-items-center">
                                {/*<Link className="nav-link text-light" to="/register">Register</Link>
                                    <Link className="nav-link text-light" to="/login">Login</Link>*/}

                                <button className="btn btn-outline-success text-light" type="submit">Search</button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;