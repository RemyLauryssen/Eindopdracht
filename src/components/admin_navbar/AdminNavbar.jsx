import {NavLink} from "react-router-dom";
import "./AdminNavbar.css";
function AdminNavbar() {
    return (
        <>
            <nav>
                <ul className="admin-nav-container">
                    <li className="admin-item"><NavLink to={"/adminReservations"} className={({isActive}) => isActive ? 'active-admin-shortcut' : 'admin-shortcuts-default'}>Reserveringen</NavLink></li>
                    <li className="admin-item"><NavLink to={"/adminMenu"} className={({isActive}) => isActive ? 'active-admin-shortcut' : 'admin-shortcuts-default'}>Menukaart</NavLink></li>
                    <li className="horizontal-separator">||</li>
                    <li className="admin-item"><NavLink to={"/adminOrders"} className={({isActive}) => isActive ? 'active-admin-shortcut' : 'admin-shortcuts-default'}> Bestellingen</NavLink></li>
                    <li className="admin-item"><NavLink to={"/adminProducts"} className={({isActive}) => isActive ? 'active-admin-shortcut' : 'admin-shortcuts-default'}>Producten</NavLink></li>
                </ul>
            </nav>
        </>
    )
}

export default AdminNavbar;