import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthenticationContext } from "../../context/AuthenticationContext.jsx";

export default function RoleProtectedRoute({ allowedRoles = [], children }) {
    const { initialized, authenticated, roles } = useContext(AuthenticationContext);

    if (!initialized) return <div>Authenticatie wordt geladen…</div>;
    if (!authenticated) return <Navigate to="/login" replace />;
    const hasAccess = roles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) return <div>Toegang geweigerd...</div>;

    return children;
}