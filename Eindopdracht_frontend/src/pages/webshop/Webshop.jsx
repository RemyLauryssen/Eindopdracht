import React, {useEffect, useState} from "react";
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
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }, [basketItems]);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const decoded = jwt_decode.default(token);
            const roles = decoded.realm_access?.roles || decoded.resource_access?.["Webshop-frontend"]?.roles || [];
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
            ...prev, [productId]: prev[productId] + 1,
        }));
    }

    function decrement(productId) {
        setQuantities((prev) => ({
            ...prev, [productId]: Math.max(1, prev[productId] - 1),
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
                    ...updated[existingIndex], quantity: updated[existingIndex].quantity + quantity,
                };
                return updated;
            }

            return [...prev, {productId: product.id, quantity}];
        });

        setQuantities((prev) => ({
            ...prev, [productId]: 1,
        }));
    }

    async function removeFromWebshop(productId) {
        try {
            setProducts((prev) => prev.filter((product) => product.id !== productId));

            const response = await adminApi.delete(`products/${productId}`);

            if (response.status === 204) {
                alert("Product verwijderd!");
            } else {
                alert("Er is iets verkeerd gegaan. Product kon niet worden verwijderd.");
            }
        } catch (err) {
            console.error("Fout bij verwijderen product:", err);

            setProducts((prev) => [...prev]);
            alert("Fout bij verwijderen van product. Probeer het later nogmaals.");
        }
    }

    return (
        <>
            <div className="webshop-introduction">
                <h1>Webshop</h1>
                <p>
                    Welkom bij de webshop van Celia's Kitchen. Hier kunt u uw favoriete
                    producten bestellen en ophalen wanneer het u uitkomt!
                </p>
            </div>

            <div className="webshop-main-container">
                <ul className="product-catalog">
                    {products.map((product) => (<div key={product.id} className="product-card">
                        <img
                            src={`http://localhost:8080${product.imageUrl}`}
                            alt={product.name}
                        />
                        <li><h4>{product.name}</h4></li>
                        <li><h5>{product.shortDescription}</h5></li>
                        <li><h5>
                            € {product.price.toLocaleString("nl-NL", {
                            minimumFractionDigits: 2, maximumFractionDigits: 2,
                        })}
                        </h5></li>

                        {isAuthorized && (<>
                                <div className="quantity-controls">
                                    <li>
                                        <button className="quantity-button"
                                                onClick={() => decrement(product.id)}>-
                                        </button>
                                    </li>
                                    <li>
                                        <p className="quantity-total">{quantities[product.id] ?? 0}</p>
                                    </li>
                                    <li>
                                        <button className="quantity-button"
                                                onClick={() => increment(product.id)}>+
                                        </button>
                                    </li>
                                </div>
                                <li>
                                    <button
                                        className="order-button"
                                        onClick={() => addToBasket(product.id)}
                                        disabled={quantities[product.id] <= 0}
                                    >
                                        Toevoegen
                                    </button>
                                </li>
                            </>

                        )}

                        {isAdmin && (<li>
                            <button
                                className="remove-button"
                                onClick={() => removeFromWebshop(product.id)}
                            >
                                Verwijderen
                            </button>
                        </li>)}
                    </div>))}
                </ul>
            </div>
        </>
    );
}

export default Webshop;