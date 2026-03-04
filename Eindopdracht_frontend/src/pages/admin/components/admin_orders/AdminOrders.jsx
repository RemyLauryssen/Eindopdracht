import React, {useEffect, useState} from "react";
import adminApi from "../../../../constants/admin_api/AdminApi.jsx";
import "./AdminOrders.css";

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
        <>
            <h1>Bestellingen</h1>
            {orders.length === 0 ? (
                <p>Geen bestellingen gevonden.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.orderId} className="order-card">
                            <h3>Bestelnr. {order.orderId}</h3>

                            <p>
                                <strong>Klant:</strong> {order.customerName}<br/>
                                <strong>Email:</strong> {order.customerEmail}<br/>
                                <strong>Datum:</strong> {new Date(order.dateCreated).toLocaleString("nl-NL")}<br/>
                                <strong>Betaalmethode:</strong> {order.paymentMethod || "Onbekend"}<br/>
                                <strong>Transactie ID:</strong> {order.transactionId || "-"}<br/>
                                <strong>Betaald bedrag:</strong> € {(order.paymentAmount ?? 0)
                                .toLocaleString("nl-NL", {minimumFractionDigits: 2})}
                            </p>

                            <table className="order-items">
                                <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Prijs</th>
                                    <th>Aantal</th>
                                    <th>Subtotaal</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.items?.map((item, i) => (
                                    <tr key={i}>
                                        <td>{item.productName}</td>

                                        <td>
                                            € {(item.unitPrice ?? 0).toLocaleString("nl-NL", {
                                            minimumFractionDigits: 2
                                        })}
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            € {(item.price ?? 0).toLocaleString("nl-NL", {
                                            minimumFractionDigits: 2
                                        })}
                                        </td>
                                    </tr>
                                ))}

                                <tr className="order-total-row">
                                    <td colSpan="3"><strong>Totaal</strong></td>
                                    <td>
                                        <strong>
                                            € {(order.totalPrice ?? 0)
                                            .toLocaleString("nl-NL", {
                                                minimumFractionDigits: 2
                                            })}
                                        </strong>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default AdminOrders;