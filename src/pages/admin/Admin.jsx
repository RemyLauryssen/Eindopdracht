import "./Admin.css";
import AdminReservations from "./components/admin_reservations/AdminReservations.jsx";
import AdminProducts from "./components/admin_products/AdminProducts.jsx";
import AdminOrders from "./components/admin_orders/AdminOrders.jsx";
import AdminMenu from "./components/admin_menu/AdminMenu.jsx";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import AdminNavbar from "../../components/admin_navbar/AdminNavbar.jsx";


function Admin() {
    return (
        <h1>Dit is de adminpagina</h1>
    )
}

export default Admin;