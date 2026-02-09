import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../../pages/homepage/Homepage.jsx";
import Menu from "../../pages/menu/Menu.jsx";
import Contact from "../../pages/contact/Contact.jsx";
import Webshop from "../../pages/webshop/Webshop.jsx";
import Profile from "../../pages/profile/Profile.jsx";
import ShoppingBasket from "../../pages/shopping_basket/ShoppingBasket.jsx";
import Admin from "../../pages/admin/Admin.jsx";
import Login from "../../pages/login/Login.jsx";
import RoleProtectedRoute from "../security/RoleProtectedRoute.jsx";

function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* PUBLIC */}
                <Route path="/" element={<Homepage />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/webshop" element={<Webshop />} />
                <Route path="/login" element={<Login />} />

                {/* USER */}
                <Route path="/profile" element={
                    <RoleProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                        <Profile />
                    </RoleProtectedRoute>
                } />
                <Route path="/shopping-basket" element={
                    <RoleProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                        <ShoppingBasket />
                    </RoleProtectedRoute>
                } />

                {/* ADMIN */}
                <Route path="/admin" element={
                    <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                        <Admin />
                    </RoleProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default AppRouter;