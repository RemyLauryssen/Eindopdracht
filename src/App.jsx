import './App.css'
import {Routes, Route, Navigate} from "react-router-dom";

import Navigation from "./components/navigation/Navigation.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import Contact from "./pages/contact/Contact";
import Menu from "./pages/menu/Menu.jsx";
import Webshop from "./pages/webshop/Webshop";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile.jsx";
import {useContext} from "react";
import {AuthenticationContext} from "./context/AuthenticationContext.jsx";
import Admin from "./pages/admin/Admin.jsx";
import AdminNavbar from "./components/admin_navbar/AdminNavbar.jsx";
import AdminReservations from "./pages/admin/components/admin_reservations/AdminReservations.jsx";
import AdminMenu from "./pages/admin/components/admin_menu/AdminMenu.jsx";
import AdminProducts from "./pages/admin/components/admin_products/AdminProducts.jsx";
import AdminOrders from "./pages/admin/components/admin_orders/AdminOrders.jsx";


function App() {
    const {isUser, isAdmin} = useContext(AuthenticationContext);

    return (
        <>
            <Navigation/>
            {isAdmin ? <AdminNavbar/> : <p></p>}
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/webshop" element={<Webshop/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={isUser ? <Profile/> : <Navigate to="/signup"/>}/>
                <Route path="/admin" element={isAdmin ? <Admin/> : <Navigate to="/"/>}/>
                <Route path="/adminReservations" element={isAdmin ? <AdminReservations/> : <Navigate to="/"/>}/>
                <Route path="/adminMenu" element={isAdmin ? <AdminMenu/> : <Navigate to="/"/>}/>
                <Route path="/adminOrders" element={isAdmin ? <AdminOrders/> : <Navigate to="/"/>}/>
                <Route path="/adminProducts" element={isAdmin ? <AdminProducts/> : <Navigate to="/"/>}/>

            </Routes>

        </>
    )
}

export default App
