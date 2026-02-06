import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ShoppingBasket.css";

function ShoppingBasket() {
    const [basketItems, setBasketItems] = useState(() => {
        const storedBasket = localStorage.getItem("basketItems");
        return storedBasket ? JSON.parse(storedBasket) : [];
    });

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:8080/products")
            .then(res => setProducts(res.data))
            .catch(console.error)
            .finally(() => setLoadingProducts(false));
    }, []);

    useEffect(() => {
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }, [basketItems]);

    const basketWithProducts = basketItems.map(item => {
        const productId = item.productId ?? item.product?.id;
        const product = products.find(p => p.id === productId);

        return { ...item, product, productId };
    });

    function removeItem(productId) {
        setBasketItems(prev =>
            prev.filter(item => item.productId !== productId)
        );
    }

    function updateQuantity(productId, newQuantity) {
        if (newQuantity <= 0) {
            removeItem(productId);
            return;
        }

        setBasketItems(prev =>
            prev.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    }

    async function placeOrder() {
        const orderPayload = {
            customerName: "Abcd",
            customerEmail: "Efgh@example.com",
            items: basketItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        try {
            await axios.post("http://localhost:8080/orders", orderPayload);
            setBasketItems([]);
            localStorage.removeItem("basketItems");
            alert("Bestelling geplaatst! 🎉");
        } catch (error) {
            console.error(error);
            alert("Er ging iets mis bij het plaatsen van de bestelling.");
        }
    }

    const totalPrice = basketWithProducts.reduce((total, item) => {
        if (!item.product) return total;
        return total + item.product.price * item.quantity;
    }, 0);

    if (loadingProducts) {
        return <p>Loading products…</p>;
    }



    return (
        <main>
            <h1>Winkelwagen</h1>

            {basketWithProducts.length === 0 ? (
                <p>Uw winkelwagen is leeg.</p>
            ) : (
                <>
                    <ul className="basket-list">
                        {basketWithProducts.map(item => (
                            <li key={item.productId} className="basket-item">
                                {!item.product ? (
                                    <p>Product niet gevonden</p>
                                ) : (
                                    <>
                                        <h4>{item.product.name}</h4>
                                        <img
                                            src={`http://localhost:8080${item.product.imageUrl}`}
                                            alt={item.product.name} />
                                        <div className="basket-quantity">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.productId, item.quantity - 1)
                                                }
                                            >
                                                -
                                            </button>

                                            <span>{item.quantity}</span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.productId, item.quantity + 1)
                                                }
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.productId)}
                                        >
                                            Verwijderen
                                        </button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="basket-total">
                        <strong>
                            Totaal: €{" "}
                            {totalPrice.toLocaleString("nl-NL", {
                                minimumFractionDigits: 2,
                            })}
                        </strong>

                        <button className="checkout-button" onClick={placeOrder}>
                            Bestelling plaatsen
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}

export default ShoppingBasket;