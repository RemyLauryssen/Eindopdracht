import { createContext, useEffect, useState } from "react";
import keycloak from "../components/security/Keycloak.jsx";

export const AuthenticationContext = createContext(null);

const clientId = "Webshop-frontend";

export default function AuthenticationContextProvider({ children }) {
    const [initialized, setInitialized] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    // Initialize Keycloak
    useEffect(() => {
        keycloak
            .init({
                onLoad: "check-sso", // check for existing session but do not force login
                pkceMethod: "S256",
                checkLoginIframe: false,
            })
            .then((auth) => {
                if (auth) {
                    localStorage.setItem("accessToken", keycloak.token)
                }
                setAuthenticated(auth);
                setInitialized(true);
            })
            .catch(() => {
                console.error("Keycloak init failed");
                setInitialized(true);
            });
    }, []);

    // Refresh token ONLY if authenticated
    useEffect(() => {
        if (!initialized || !authenticated) return;

        const interval = setInterval(() => {
            keycloak.updateToken(60).catch(() => keycloak.login());
        }, 60000);

        return () => clearInterval(interval);
    }, [initialized, authenticated]);

    // Extract roles
    const roles = [
        ...(keycloak.tokenParsed?.resource_access?.[clientId]?.roles ?? []),
        ...(keycloak.tokenParsed?.realm_access?.roles ?? []),
    ];

    const login = () => keycloak.login();
    const logout = () => keycloak.logout(
        {redirectUri: "http://localhost:5173/"}
    );

    if (!initialized) {
        return <div>Loading authentication…</div>;
    }

    return (
        <AuthenticationContext.Provider
            value={{
                keycloak,
                initialized,
                authenticated,
                token: keycloak.token,
                roles,
                login,
                logout,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}
