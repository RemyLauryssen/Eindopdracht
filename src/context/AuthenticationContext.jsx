import React, {createContext, useState} from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticationContext = createContext({});

function AuthenticationContextProvider({children}) {
    const [isUser, toggleIsUser] = useState(true);
    const [isAdmin, toggleIsAdmin] = useState(true);
    const navigate = useNavigate();

    function login() {
        toggleIsUser(true);
        navigate('/profile');
    }

    function logout() {
        toggleIsUser(false);
        navigate('/register');
    }

    const contextData = {
        isUser: isUser,
        isAdmin: isAdmin,
        login: login,
        logout: logout
    };

    return (
        <AuthenticationContext.Provider value={contextData}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export default AuthenticationContextProvider;