import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthenticationContext} from "../../context/AuthenticationContext.jsx";
import "./Login.css";

function Login() {
    const {login} = useContext(AuthenticationContext);

    function handleSubmit(e) {
        e.preventDefault();
        login();
    }

    return (
        <main>
            <section className="form-container">
                <h1>Inloggen</h1>
                <div>
                    <form className="login-form">
                        <label className="form-label" htmlFor="email-input-box">
                            <p>E-mailadres:</p>
                            <input
                                type="email"
                                id="email-input-box"
                                name="email"
                                className="email-input-box"
                            />
                        </label>
                        <label className="form-label" htmlFor="password-input-box">
                            <p>Wachtwoord:</p>
                            <input
                                type="password"
                                id="password-input-box"
                                name="password"
                                className="password-input-box"
                            />
                        </label>
                        <button id="login-form" type="submit" className="submit-button" onSubmit={handleSubmit}>Inloggen</button>
                    </form>
                </div>
                <p>Wachtwoord vergeten?</p>
            </section>
        </main>
    );
}

export default Login;