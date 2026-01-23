import "./Navigation.css";
import {NavLink, useNavigate} from "react-router-dom";
import companyLogo from "../../assets/company-logo.jpg";
import loginIcon from "../../assets/Login-Icon.svg";
import {useContext} from "react";
import {AuthenticationContext} from "../../context/AuthenticationContext.jsx";

function Navigation() {
    const navigate = useNavigate();
    const {isUser} = useContext(AuthenticationContext);

    return (
        <nav>
            <div className="nav-container">
                <span className="nav-image">
                    <button className="logo-button" onClick={() => navigate("/")}>
                    <img className="company-logo" src={companyLogo} alt="Logo van het restaurant"/>
                        </button>
                </span>

                <ul>
                <div className="nav-items">
                    <li><NavLink to="/"
                                 className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Restaurant</NavLink>
                    </li>
                    <li><NavLink to="/menu"
                                 className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Menu
                        </NavLink></li>
                    <li><NavLink to="/contact"
                                 className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Contact</NavLink>
                    </li>
                    <li><NavLink to="/webshop"
                        className={({isActive}) => isActive ? 'active-link' : 'default-link'}>Webshop</NavLink>
                    </li>
                    <li>
                        {isUser ?
                            <NavLink to="/profile"><img className="login-icon" src={loginIcon} alt="Profiel"/></NavLink> :
                        <NavLink to="/login"
                                 className={({isActive}) => isActive ? 'active-link' : 'default-link'}>
                        <img className="login-icon" src={loginIcon} alt="Inloggen" />
                    </NavLink>}
                    </li>
                </div>
                </ul>

            </div>
        </nav>
    );
}

export default Navigation;