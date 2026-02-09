import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext.jsx";

export default function ProtectedRoute({ children }) {
    const { initialized, authenticated } = useContext(AuthenticationContext);

    // Wait until Keycloak finishes initializing
    if (!initialized) return <div>Loading…</div>;

    // If user is not authenticated, redirect to login page
    if (!authenticated) return <Navigate to="/login" replace />;

    // User is authenticated → allow access
    return children;
}