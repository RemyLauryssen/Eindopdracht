import './App.css';
import { Routes, Route } from "react-router-dom";

import AppLayout from "./constants/AppLayout.jsx";

import Homepage from "./pages/homepage/Homepage.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Menu from "./pages/menu/Menu.jsx";
import Webshop from "./pages/webshop/Webshop.jsx";
import Login from "./pages/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import ShoppingBasket from "./pages/shopping_basket/ShoppingBasket.jsx";
import Payment from "./pages/payment/Payment.jsx";

import Admin from "./pages/admin/Admin.jsx";
import AdminReservations from "./pages/admin/components/admin_reservations/AdminReservations.jsx";
import AdminMenu from "./pages/admin/components/admin_menu/AdminMenu.jsx";
import AdminOrders from "./pages/admin/components/admin_orders/AdminOrders.jsx";
import AdminProducts from "./pages/admin/components/admin_products/AdminProducts.jsx";

import RoleProtectedRoute from "./components/security/RoleProtectedRoute.jsx";

function App() {

    return (
        <Routes>
            <Route element={<AppLayout />}>

                <Route path="/" element={<Homepage />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/webshop" element={<Webshop />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/profile"
                    element={
                        <RoleProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                            <Profile />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/shopping-basket"
                    element={
                        <RoleProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                            <ShoppingBasket />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/payment"
                    element={
                        <RoleProtectedRoute allowedRoles={["USER", "ADMIN"]}>
                            <Payment />
                        </RoleProtectedRoute>
                    }
                />

                {/* admin pages (still protected) */}
                <Route
                    path="/admin"
                    element={
                        <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                            <Admin />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/adminReservations"
                    element={
                        <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminReservations />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/adminMenu"
                    element={
                        <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminMenu />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/adminOrders"
                    element={
                        <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminOrders />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="/adminProducts"
                    element={
                        <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminProducts />
                        </RoleProtectedRoute>
                    }
                />

            </Route>
        </Routes>
    );
}

export default App;