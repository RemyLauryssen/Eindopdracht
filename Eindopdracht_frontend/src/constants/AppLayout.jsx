import Navigation from "../components/navigation/Navigation.jsx";
import AdminNavbar from "../components/admin_navbar/AdminNavbar.jsx";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationContext.jsx";

function AppLayout() {

    const { authenticated, roles } = useContext(AuthenticationContext);

    const isAdmin = authenticated && roles.includes("ADMIN");

    return (
        <>
            <Navigation />

            {isAdmin && <AdminNavbar />}

            <main className={isAdmin ? "with-admin-nav" : ""}>
                <Outlet />
            </main>
        </>
    );
}

export default AppLayout;