import React from "react";
import "./Login.css";

function Login() {
    return (
        <main>
            <section className="form-container">
                <h1>Inloggen</h1>
                <div>
                    <form className="login-form">
                        <label htmlFor="email">E-mailadres:</label>
                        <input type="email" className="email-input-box"></input>
                        <label htmlFor="Wachtwoord">Wachtwoord:</label>
                        <input type="password" className="password-input-box"></input>
                        <button id="login-form" type="submit" className="submit-button">Inloggen</button>
                    </form>
                </div>
                <p>Wachtwoord vergeten?</p>
            </section>
        </main>
    );
}

export default Login;