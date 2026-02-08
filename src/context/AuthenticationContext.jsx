import { createContext, useEffect, useState } from "react";
import keycloak from "../components/security/Keycloak.jsx";

export const AuthenticationContext = createContext(null);

export default function AuthenticationContextProvider({ children }) {
    const [initialized, setInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        keycloak
            .init({
                onLoad: "login-required",
                pkceMethod: "S256",
                checkLoginIframe: false,
            })
            .then((auth) => {
                setAuthenticated(auth);
                setInitialized(true);
            })
            .catch(() => {
                console.error("Keycloak init failed");
            });
    }, []);

    useEffect(() => {
        if (!initialized) return;

        const interval = setInterval(() => {
            keycloak
                .updateToken(60)
                .catch(() => {
                    keycloak.login();
                });
        }, 60000);

        return () => clearInterval(interval);
    }, [initialized]);

   if (!initialized) {
        return <div>Loading authentication…</div>;
    }

    return (
        <AuthenticationContext.Provider
            value={{
                keycloak,
                authenticated,
                token: keycloak.token,
                logout: () => keycloak.logout(),
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}