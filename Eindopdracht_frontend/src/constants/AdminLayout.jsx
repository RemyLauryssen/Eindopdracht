import AdminNavbar from "../components/admin_navbar/AdminNavbar.jsx";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <>
            <AdminNavbar />

            <main className="with-admin-nav">
                <Outlet />
            </main>
        </>
    );
}

export default AdminLayout;