import React, {useEffect, useState} from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./ShoppingBasket.css";
import {useNavigate} from "react-router-dom";

function ShoppingBasket() {
    const [basketItems, setBasketItems] = useState(() => {
        const storedBasket = localStorage.getItem("basketItems");
        return storedBasket ? JSON.parse(storedBasket) : [];
    });

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setUser({
                    id: decoded.sub,
                    name: decoded.name,
                    email: decoded.email,
                    roles: decoded["realm_access"]?.roles || [],
                });
            } catch (err) {
                console.error("Invalid token", err);
            }
        }
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8080/products")
            .then((res) => setProducts(res.data))
            .catch(console.error)
            .finally(() => setLoadingProducts(false));
    }, []);

    useEffect(() => {
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }, [basketItems]);

    const basketWithProducts = basketItems.map((item) => {
        const productId = item.productId ?? item.product?.id;
        const product = products.find((p) => p.id === productId);
        return {...item, product, productId};
    });

    function removeItem(productId) {
        setBasketItems((prev) => prev.filter((item) => item.productId !== productId));
    }

    function updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeItem(productId);
            return;
        }

        setBasketItems((prev) =>
            prev.map((item) =>
                item.productId === productId ? {...item, quantity: newQuantity} : item
            )
        );
    }

    function placeOrder() {
        if (!user) {
            alert("U moet ingelogd zijn om een bestelling te plaatsen.");
            return;
        }

        navigate("/payment", {
            state: {
                basket: basketItems,
                total: totalPrice,
                customer: user,
            },
        });
    }

    const totalPrice = basketWithProducts.reduce((total, item) => {
        if (!item.product) return total;
        return total + item.product.price * item.quantity;
    }, 0);

    if (loadingProducts) return <p>Loading products…</p>;

    return (
        <main>
            <h1>Winkelwagen</h1>

            {basketWithProducts.length === 0 ? (
                <p>Uw winkelwagen is leeg.</p>
            ) : (
                <div className="basket-card">
                    <table className="basket-table">
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th className="text-right">Aantal</th>
                            <th className="text-right">Prijs</th>
                            <th className="text-right">Subtotaal</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {basketWithProducts.map((item) => {
                            if (!item.product) {
                                return (
                                    <tr key={item.productId}>
                                        <td colSpan="5">Product niet gevonden</td>
                                    </tr>
                                );
                            }

                            const subtotal =
                                item.product.price * item.quantity;

                            return (
                                <tr key={item.productId}>
                                    <td>
                                        <div className="basket-product-cell">
                                            <img
                                                src={`http://localhost:8080${item.product.imageUrl}`}
                                                alt={item.product.name}
                                            />
                                            <span>{item.product.name}</span>
                                        </div>
                                    </td>

                                    <td className="basket-quantity-cell">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.productId,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.productId,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </td>

                                    <td className="text-right">
                                        € {item.product.price.toLocaleString("nl-NL", {minimumFractionDigits: 2})}
                                    </td>

                                    <td className="text-right">
                                        € {subtotal.toLocaleString("nl-NL", {minimumFractionDigits: 2})}
                                    </td>

                                    <td>
                                        <button
                                            className="remove-button"
                                            onClick={() =>
                                                removeItem(item.productId)
                                            }
                                        >
                                            Verwijderen
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}

                        <tr className="basket-total-row">
                            <td colSpan="3"><strong>Totaal</strong></td>
                            <td>
                                <strong>
                                    €{" "}
                                    {totalPrice.toLocaleString("nl-NL", {
                                        minimumFractionDigits: 2,
                                    })}
                                </strong>
                            </td>
                            <td>
                                <button
                                    className="checkout-button"
                                    onClick={placeOrder}
                                >
                                    Bestelling plaatsen
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}

export default ShoppingBasket;
