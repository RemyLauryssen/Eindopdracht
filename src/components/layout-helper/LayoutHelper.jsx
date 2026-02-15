import React, { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext.jsx";

export default function LayoutHelper({ children }) {
    const { authenticated, roles } = useContext(AuthenticationContext);
    const isAdmin = authenticated && roles.includes("ADMIN");

    return (
        <div className={isAdmin ? "height admin" : "height"}>
            {children}
        </div>
    );
}