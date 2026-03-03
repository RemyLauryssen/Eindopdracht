import {useContext} from "react";
import {AuthenticationContext} from "../../context/AuthenticationContext.jsx";

export default function LoginPage() {
    const {login, authenticated, roles} = useContext(AuthenticationContext);

    if (authenticated) {
        return (
            <main>
                <div>
                    <h3>Je bent al ingelogd</h3>
                    <p>Jouw rollen: {roles.join(", ")}</p>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div style={{textAlign: "center", marginTop: "2rem"}}>
                <h2>Inloggen</h2>
                <p>Klik op de knop om in te loggen met je account:</p>
                <button
                    onClick={login}
                    style={{padding: "0.5rem 1rem", fontSize: "1rem", cursor: "pointer"}}
                >
                    Inloggen
                </button>
            </div>
        </main>
    );
}