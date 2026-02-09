import "./AdminMenu.css";
import React, { useState } from "react";
import adminApi from "../../../../constants/admin_api/adminApi";
import UseMenuItems from "../../../../hooks/UseMenuItems.jsx";

function AdminMenu() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [dishType, setDishType] = useState("lunch");
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);

    const { menuItems, refetch, loading, error: fetchError } = UseMenuItems("/menu");

    async function addMenuItem(e) {
        e.preventDefault();
        toggleError(false);

        try {
            await adminApi.post("/menu", {
                name: productName,
                description: productDescription,
                price: parseFloat(productPrice),
                dish: dishType,
            });

            toggleAddSuccess(true);
            await refetch();
        } catch (err) {
            console.error(err);
            toggleError(err.response?.data?.message || true);
        }
    }

    async function deleteMenuItem(id) {
        try {
            await adminApi.delete(`/menu/${id}`);
            await refetch();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="menu-page-container">
            <div className="menu-left-side">
                <h2>Huidig menu</h2>

                {loading && <p>Menu wordt geladen…</p>}
                {fetchError && <p className="error-message">{fetchError}</p>}

                {!loading && !fetchError && (
                    <>
                        <h3>Lunchgerechten</h3>
                        {menuItems.filter(item => item.dish === "lunch").map(item => (
                            <article className="menu-item" key={item.id}>
                                <h4>{item.name}</h4>
                                <strong>€ {item.price.toFixed(2)}</strong>
                                <p>{item.description}</p>
                                <button onClick={() => deleteMenuItem(item.id)}>X</button>
                            </article>
                        ))}

                        <h3>Gebakjes en deegwaren</h3>
                        {menuItems.filter(item => item.dish === "pastries").map(item => (
                            <article className="menu-item" key={item.id}>
                                <div>{item.name}</div>
                                <strong>€ {item.price.toFixed(2)}</strong>
                                <strong>{item.description}</strong>
                                <button onClick={() => deleteMenuItem(item.id)}>X</button>
                            </article>
                        ))}

                        <h3>Drankjes</h3>
                        {menuItems.filter(item => item.dish === "drinks").map(item => (
                            <article className="menu-item" key={item.id}>
                                <div>{item.name}</div>
                                <strong>€ {item.price.toFixed(2)}</strong>
                                <button onClick={() => deleteMenuItem(item.id)}>X</button>
                            </article>
                        ))}
                    </>
                )}
            </div>

            <div className="menu-right-side">
                <h2>Een product toevoegen</h2>
                {addSuccess && <p className="success-message">Product is toegevoegd!</p>}
                {error && <p className="error-message">Toevoegen is mislukt</p>}

                <form onSubmit={addMenuItem} className="menu-form-container">
                    <div className="radio-button-container">
                        {["lunch", "pastries", "drinks"].map(type => (
                            <label key={type}>
                                <input
                                    type="radio"
                                    name="menu-product"
                                    value={type}
                                    checked={dishType === type}
                                    onChange={(e) => setDishType(e.target.value)}
                                />
                                {type === "lunch" ? "Lunchgerecht" : type === "pastries" ? "Gebakjes en deegwaren" : "Drankje"}
                            </label>
                        ))}
                    </div>

                    <input
                        type="text"
                        placeholder="Naam"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Beschrijving"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Prijs"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />

                    <button type="submit">Product toevoegen</button>
                </form>
            </div>
        </div>
    );
}

export default AdminMenu;