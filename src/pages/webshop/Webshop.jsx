import React, { useEffect, useState } from "react";
import "./Webshop.css";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
import adminApi from "../../constants/admin_api/AdminApi.jsx";

function Webshop() {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [basketItems, setBasketItems] = useState(() => {
        const storedBasket = localStorage.getItem("basketItems");
        return storedBasket ? JSON.parse(storedBasket) : [];
    });
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // Track if user is an admin

    // Fetch products
    useEffect(() => {
        fetchProducts();
    }, []);

    // Persist basket to localStorage
    useEffect(() => {
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }, [basketItems]);

    // Check token for USER or ADMIN role
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const decoded = jwt_decode.default(token);
            const roles =
                decoded.realm_access?.roles ||
                decoded.resource_access?.["Webshop-frontend"]?.roles ||
                [];
            if (roles.includes("USER") || roles.includes("ADMIN")) {
                setIsAuthorized(true);
                if (roles.includes("ADMIN")) {
                    setIsAdmin(true);
                }
            }
        } catch (err) {
            console.error("Invalid token", err);
        }
    }, []);

    async function fetchProducts() {
        try {
            const response = await axios.get("http://localhost:8080/products");
            setProducts(response.data);

            const initialQuantities = {};
            response.data.forEach((p) => {
                initialQuantities[p.id] = 1;
            });
            setQuantities(initialQuantities);
        } catch (e) {
            console.error(e);
        }
    }

    function increment(productId) {
        setQuantities((prev) => ({
            ...prev,
            [productId]: prev[productId] + 1,
        }));
    }

    function decrement(productId) {
        setQuantities((prev) => ({
            ...prev,
            [productId]: Math.max(1, prev[productId] - 1),
        }));
    }

    function addToBasket(productId) {
        const product = products.find((p) => p.id === productId);
        const quantity = quantities[productId];

        if (!product || quantity <= 0) return;

        setBasketItems((prev) => {
            const existingIndex = prev.findIndex((item) => item.productId === productId);

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            }

            return [...prev, { productId: product.id, quantity }];
        });

        setQuantities((prev) => ({
            ...prev,
            [productId]: 1,
        }));
    }

    async function removeFromWebshop(productId) {
        try {
            setProducts((prev) => prev.filter((product) => product.id !== productId));

            const response = await adminApi.delete(`products/${productId}`);

            if (response.status === 204) {
                alert("Product successfully removed!");
            } else {
                alert("Something went wrong. The product couldn't be removed.");
            }
        } catch (err) {
            console.error("Error removing product:", err);

            setProducts((prev) => [...prev]);
            alert("Error removing product. Please try again later.");
        }
    }

    return (
        <main>
            <div className="webshop-introduction">
                <h1>Webshop</h1>
                <p>
                    Welkom bij de webshop van Celia's Kitchen. Hier kunt u uw favoriete
                    producten bestellen en ophalen wanneer het u uitkomt!
                </p>
            </div>

            <div className="webshop-main-container">
                <ul className="product-catalog">
                    {products.map((product) => (
                        <li key={product.id} className="product-card">
                            <img
                                src={`http://localhost:8080${product.imageUrl}`}
                                alt={product.name}
                                className="product-image"
                            />
                            <h4>{product.name}</h4>
                            <p>{product.shortDescription}</p>
                            <p>
                                €{product.price.toLocaleString("nl-NL", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                            </p>

                            {/* Quantity controls and add button only visible for USER/ADMIN */}
                            {isAuthorized && (
                                <div className="quantity-controls">
                                    <button onClick={() => decrement(product.id)}>-</button>
                                    <span>{quantities[product.id] ?? 0}</span>
                                    <button onClick={() => increment(product.id)}>+</button>
                                    <button
                                        className="order-button"
                                        onClick={() => addToBasket(product.id)}
                                        disabled={quantities[product.id] <= 0}
                                    >
                                        Toevoegen
                                    </button>
                                </div>
                            )}

                            {/* Remove button for ADMIN only */}
                            {isAdmin && (
                                <button
                                    className="remove-button"
                                    onClick={() => removeFromWebshop(product.id)}
                                >
                                    Verwijderen
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default Webshop;