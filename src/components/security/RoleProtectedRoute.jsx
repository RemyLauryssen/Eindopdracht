import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext.jsx";

export default function RoleProtectedRoute({ allowedRoles = [], children }) {
    const { initialized, authenticated, roles } = useContext(AuthenticationContext);

    if (!initialized) return <div>Loading authentication…</div>;

    // Redirect to login only if the user is trying to access a protected page
    if (!authenticated) return <Navigate to="/login" replace />;

    // Check if the user has at least one allowed role
    const hasAccess = roles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) return <div>Access Denied</div>;

    return children;
}