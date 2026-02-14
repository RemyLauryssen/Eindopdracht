import "./Navigation.css";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext.jsx";
import companyLogo from "../../assets/logo/Celia's.svg";
import loginIcon from "../../assets/Login-Icon.svg";
import shoppingIcon from "../../assets/Shopping-cart.svg";

function Navigation() {
    const navigate = useNavigate();
    const { authenticated, roles, login, logout } = useContext(AuthenticationContext);

    const isAdmin = authenticated && roles.includes("ADMIN");
    const isUser = authenticated && (roles.includes("USER") || isAdmin);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav>
            <div className="nav-container">
                <span className="nav-image">
                    <button className="logo-button" onClick={() => navigate("/")}>
                        <img className="company-logo" src={companyLogo} alt="Logo" />
                    </button>
                </span>

                <ul>
                    <div className="nav-items">
                        <li>
                            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "default-link")}>
                                Restaurant
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/menu" className={({ isActive }) => (isActive ? "active-link" : "default-link")}>
                                Menu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active-link" : "default-link")}>
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/webshop" className={({ isActive }) => (isActive ? "active-link" : "default-link")}>
                                Webshop
                            </NavLink>
                        </li>
                        <li>
                            {!authenticated ? (
                                <button className="login-button" onClick={login}>
                                    <img className="login-icon" src={loginIcon} alt="Login" />
                                </button>
                            ) : (
                                <>

                                    {isUser && (
                                        <>
                                            <NavLink to="/profile">
                                                <img className="login-icon" src={loginIcon} alt="Profile" />
                                            </NavLink>
                                            <NavLink to="/shopping-basket">
                                                <img className="login-icon" src={shoppingIcon} alt="Basket" />
                                            </NavLink>
                                        </>
                                    )}

                                    <button className="logout-button" onClick={handleLogout}>
                                        Uitloggen
                                    </button>
                                </>
                            )}
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;
