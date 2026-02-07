import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8080/orders")
            .then(res => setOrders(res.data))
            .catch(err => console.error("Failed to load orders", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p>Bestellingen laden…</p>;
    }

    return (
        <main>
            <h1>Bestellingen</h1>

            {orders.length === 0 ? (
                <p>Geen bestellingen gevonden.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <h3>Bestelnr. {order.orderId}</h3>

                            <p>
                                <strong>Klant:</strong> {order.customerName}<br />
                                <strong>Email:</strong> {order.customerEmail}<br />
                                <strong>Datum:</strong>{" "}
                                {new Date(order.orderDate).toLocaleString("nl-NL")}
                            </p>

                            <table className="order-items">
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Aantal</th>
                                    <th>Prijs</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            €{" "}
                                            {item.price.toLocaleString("nl-NL", {
                                                minimumFractionDigits: 2
                                            })}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default AdminOrders;