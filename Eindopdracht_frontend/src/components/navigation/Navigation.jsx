import "./Navigation.css";
import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext.jsx";
import companyLogo from "../../assets/logo/Celia's.svg";
import loginIcon from "../../assets/icons/user-svgrepo-com.svg";
import shoppingIcon from "../../assets/icons/Shopping-cart.svg";

function useIsMobile(breakpoint = 768) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
}

function Navigation() {
    const navigate = useNavigate();
    const { authenticated, roles, login, logout } = useContext(AuthenticationContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const isMobile = useIsMobile();
    const isAdmin = authenticated && roles.includes("ADMIN");
    const isUser = authenticated && (roles.includes("USER") || isAdmin);

    const handleLogout = () => {
        logout();
        navigate("/");
        setMenuOpen(false);
    };

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav>
            <div className="nav-container">

                <button
                    className="logo-button"
                    onClick={() => { navigate("/"); closeMenu(); }}
                >
                    <img className="company-logo" src={companyLogo} alt="Logo" />
                </button>

                <button
                    className="menu-toggle"
                    onClick={() => setMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>

                <ul className={`nav-items ${menuOpen ? "open" : ""}`}>
                    <li>
                        <NavLink onClick={closeMenu} to="/" className={({ isActive }) => isActive ? "active-link" : "default-link"}>Restaurant</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} to="/menu" className={({ isActive }) => isActive ? "active-link" : "default-link"}>Menu</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} to="/contact" className={({ isActive }) => isActive ? "active-link" : "default-link"}>Contact</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} to="/webshop" className={({ isActive }) => isActive ? "active-link" : "default-link"}>Webshop</NavLink>
                    </li>

                    {isAdmin && isMobile && (
                        <>
                            <li><NavLink onClick={closeMenu} to="/adminReservations" className={({ isActive }) => isActive ? "active-link" : "default-link"}>Reserveringen</NavLink></li>
                            <li><NavLink onClick={closeMenu} to="/adminMenu" className={({ isActive }) => isActive ? "active-link" : "default-link"}>Menukaart</NavLink></li>
                            <li><NavLink onClick={closeMenu} to="/adminOrders" className={({ isActive }) => isActive ? "active-link" : "default-link"}>Bestellingen</NavLink></li>
                            <li><NavLink onClick={closeMenu} to="/adminProducts" className={({ isActive }) => isActive ? "active-link" : "default-link"}>Producten</NavLink></li>
                        </>
                    )}

                    {!authenticated ? (
                        <li>
                            <button className="login-button" onClick={() => { login(); closeMenu(); }}>
                                <img className="login-icon" src={loginIcon} alt="Login" />
                            </button>
                        </li>
                    ) : (
                        <>
                            {isUser && (
                                <>
                                    <li>
                                        <NavLink onClick={closeMenu} to="/profile">
                                            <img className="login-icon" src={loginIcon} alt="Profile" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={closeMenu} to="/shopping-basket">
                                            <img className="login-icon" src={shoppingIcon} alt="Basket" />
                                        </NavLink>
                                    </li>
                                </>
                            )}
                            <li>
                                <button className="logout-button" onClick={handleLogout}>
                                    Uitloggen
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navigation;