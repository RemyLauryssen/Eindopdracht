import React, { useEffect, useState } from "react";
import "./Webshop.css";
import axios from "axios";

function Webshop() {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});


    // Fetch products
    useEffect(() => {
        fetchProducts();
    }, []);

    // Load basket from localStorage
    const [basketItems, setBasketItems] = useState(() => {
        const storedBasket = localStorage.getItem("basketItems");
        return storedBasket ? JSON.parse(storedBasket) : [];
    });

    // Persist basket to localStorage
    useEffect(() => {
        console.log("Saving basket:", basketItems);
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }, [basketItems]);

    async function fetchProducts() {
        try {
            const response = await axios.get("http://localhost:8080/products");
            setProducts(response.data);

            const initialQuantities = {};
            response.data.forEach(p => {
                initialQuantities[p.id] = 1;
            });
            setQuantities(initialQuantities);
        } catch (e) {
            console.error(e);
        }
    }

    function increment(productId) {
        setQuantities(prev => ({
            ...prev,
            [productId]: prev[productId] + 1,
        }));
    }

    function decrement(productId) {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, prev[productId] - 1),
        }));
    }

    function addToBasket(productId) {
        const product = products.find(p => p.id === productId);
        const quantity = quantities[productId];

        if (!product || quantity <= 0) return;

        setBasketItems(prev => {
            const existingIndex = prev.findIndex(item => item.productId === productId);

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

        setQuantities(prev => ({
            ...prev,
            [productId]: 0,
        }));
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
                    {products.map(product => (
                        <li key={product.id} className="product-card">
                            <img
                                src={`http://localhost:8080${product.imageUrl}`}
                                alt={product.name}
                                className="product-image"
                            />

                            <h4>{product.name}</h4>
                            <p>{product.shortDescription}</p>

                            <p>
                                €
                                {product.price.toLocaleString("nl-NL", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>

                            <div className="quantity-controls">
                                <button onClick={() => decrement(product.id)}>
                                    -
                                </button>

                                <span>{quantities[product.id] ?? 0}</span>

                                <button onClick={() => increment(product.id)}>
                                    +
                                </button>

                                <button
                                    className="order-button"
                                    onClick={() => addToBasket(product.id)}
                                    disabled={quantities[product.id] <= 0}
                                >
                                    Toevoegen
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default Webshop;