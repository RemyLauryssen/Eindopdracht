import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Profile() {
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Decode token **once** outside of useEffect
    const token = localStorage.getItem("accessToken");
    let decodedToken = null;

    if (token) {
        try {
            decodedToken = jwt_decode(token);
        } catch (err) {
            console.error("Invalid token", err);
        }
    }

    useEffect(() => {
        if (!token || !decodedToken) {
            setError("Je bent niet ingelogd.");
            setLoading(false);
            return;
        }

        // Set user info from token
        setUserData({
            id: decodedToken.sub,
            name: decodedToken.name ?? "Onbekend",
            email: decodedToken.email ?? "",
            roles: decodedToken["realm_access"]?.roles ?? [],
        });

        // Fetch orders for this user
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/orders/user?email=${decodedToken.email}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const safeOrders = response.data.map((order) => ({
                    ...order,
                    totalPrice: order.items.reduce((total, item) => total + (item.price ?? 0), 0), // Add prices of items
                    items: order.items?.map((item) => ({
                        ...item,
                        price: item.price ?? 0,
                        productName: item.productName ?? "Onbekend product",
                    })) ?? [],
                }));
                console.log(response.data);
                setOrders(safeOrders);
            } catch (err) {
                console.error(err);
                setError("Kon bestellingen niet ophalen.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
        // Only run once on mount
    }, [token]); // <- Remove decodedToken from dependencies

    if (loading) return <p>Bezig met laden...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!userData) return null;

    return (
        <main>
            <h1>Profielpagina</h1>

            <h2 className="user-details-title">Gebruikersgegevens</h2>
            <ul className="user-details">
                <li>
                    <h4>Naam:</h4>
                    <p>{userData.name}</p>
                </li>
                <li>
                    <h4>E-mailadres:</h4>
                    <p>{userData.email}</p>
                </li>
                <li>
                    <h4>Rollen:</h4>
                    <p>{userData.roles.join(", ")}</p>
                </li>
            </ul>

            <h2 className="user-details-title">Bestellingen</h2>
            {orders.length === 0 ? (
                <p>Geen bestellingen gevonden.</p>
            ) : (
                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-card">
                            <strong>Ordernummer:</strong> {order.orderId}
                            <strong>Datum:</strong> {new Date(order.orderDate).toLocaleDateString("nl-NL")}
                            <strong>Totaal:</strong> € {(order.totalPrice ?? 0).toFixed(2)}

                            {order.items.length === 0 ? (
                                <p>Geen producten in deze bestelling.</p>
                            ) : (
                                <ul>
                                    {order.items.map((item, idx) => (
                                        <li key={idx}>
                                            {item.productName} × {item.quantity ?? 0} – €{" "}
                                            {(item.price ?? 0).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}

export default Profile;
