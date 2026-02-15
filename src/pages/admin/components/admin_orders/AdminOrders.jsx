import React, {useEffect, useState} from "react";
import adminApi from "../../../../constants/admin_api/adminApi";
import "./AdminOrders.css";
import LayoutHelper from "../../../../components/layout-helper/LayoutHelper.jsx";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await adminApi.get("/orders");
                setOrders(res.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.status === 401
                    ? "Niet geautoriseerd. Log opnieuw in."
                    : "Bestellingen laden mislukt");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return <p>Bestellingen laden…</p>;
    if (error) return <p style={{color: "red"}}>{error}</p>;

    return (
        <LayoutHelper>
            <main>
                <h1>Bestellingen</h1>
                {orders.length === 0 ? (
                    <p>Geen bestellingen gevonden.</p>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => {
                            const total = order.items.reduce((sum, item) => {
                                return sum + (item.price * item.quantity);
                            }, 0);

                            return (
                                <div key={order.id} className="order-card">
                                    <h3>Bestelnr. {order.orderId}</h3>
                                    <p>
                                        <strong>Klant:</strong> {order.customerName}<br/>
                                        <strong>Email:</strong> {order.customerEmail}<br/>
                                        <strong>Datum:</strong> {new Date(order.dateCreated).toLocaleString("nl-NL")}
                                    </p>
                                    <table className="order-items">
                                        <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Aantal</th>
                                            <th>Prijs</th>
                                            <th>Subtotaal</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {order.items.map((item, i) => {
                                            const subtotal = item.price * item.quantity;

                                            return (
                                                <tr key={i}>
                                                    <td>{item.productName}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>
                                                        € {item.price.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td>
                                                        € {subtotal.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr className="order-total-row">
                                            <td colSpan="3"><strong>Totaal</strong></td>
                                            <td>
                                                <strong>
                                                    € {order.items
                                                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                                                    .toLocaleString("nl-NL", { minimumFractionDigits: 2 })}
                                                </strong>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                    </div>)}
            </main>
        </LayoutHelper>)
}

export default AdminOrders;