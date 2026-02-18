import "./AdminMenu.css";
import React, {useState} from "react";
import adminApi from "../../../../constants/admin_api/AdminApi.jsx";
import UseMenuItems from "../../../../hooks/UseMenuItems.jsx";
import LayoutHelper from "../../../../components/layout-helper/LayoutHelper.jsx";

function AdminMenu() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [dishType, setDishType] = useState("lunch");
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);

    const {menuItems, refetch, loading, error: fetchError} = UseMenuItems("/menu");

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
        <LayoutHelper>
            <h1>Menukaart</h1>
            <div className="menu-page-container">
                <div className="menu-left-side">
                    <h2 className="admin-title">Huidig menu</h2>

                    {loading && <p>Menu wordt geladen…</p>}
                    {fetchError && <p className="error-message">{fetchError}</p>}

                    {!loading && !fetchError && (
                        <>
                            <div className="dish-container">
                                <h2>Lunchgerechten</h2>
                                {menuItems.map((menuItem) => {
                                    if (menuItem.dish === "lunch") {
                                        return (
                                            <article className="menu-item" key={menuItem.id}>
                                                <div className="title-price-container">
                                                    <h3>{menuItem.name}</h3>
                                                    <strong>
                                                        € {menuItem.price.toLocaleString("nl-NL", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                    </strong>
                                                    <button type="button" className="delete-button" onClick={() => deleteMenuItem(menuItem.id)}>
                                                        X
                                                    </button>
                                                </div>
                                                <p className="menu-description">{menuItem.description}</p>
                                            </article>
                                        )
                                    }
                                })}
                            </div>
                            <div className="dish-container">
                                <h2>Gebakjes en deegwaren</h2>
                                {menuItems.map((menuItem) => {
                                    if (menuItem.dish === "pastries") {
                                        return (
                                            <article className="menu-item" key={menuItem.id}>
                                                <div className="title-price-container">{menuItem.name}

                                                    <strong className="pastries-price">
                                                        € {menuItem.price.toLocaleString("nl-NL", {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}</strong>
                                                    <button type="button" className="delete-button" onClick={() => deleteMenuItem(menuItem.id)}>
                                                        X
                                                    </button>
                                                </div>
                                                <p className="menu-description">{menuItem.description}</p>
                                            </article>
                                        )
                                    }
                                })}
                            </div>
                            <div className="dish-container">
                                <h2>Drankjes</h2>
                                {
                                    menuItems.map((menuItem) => {
                                        if (menuItem.dish === "drinks") {
                                            return (
                                                <article className="menu-item" key={menuItem.id}>
                                                    <div className="title-price-container">{menuItem.name}
                                                        <strong
                                                            className="extras-price"> € {menuItem.price.toLocaleString("nl-NL", {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })}</strong>
                                                        <button type="button" className="delete-button" onClick={() => deleteMenuItem(menuItem.id)}>
                                                            X
                                                        </button>
                                                    </div>
                                                </article>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </>
                    )}
                </div>
                <div className="vertical-separator"/>
                <div className="menu-right-side">
                    <h2 className="admin-title">Een product toevoegen</h2>
                    {addSuccess && <p className="success-message">Product is toegevoegd!</p>}
                    {error && <p className="error-message">Toevoegen is mislukt</p>}

                    <form onSubmit={addMenuItem} className="menu-form-container product-input-form">
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
                        <div className="product-input-form">
                        <label>Naam:</label>
                        <input
                            type="text"
                            className="input-field"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                        </div>
                        <div className="product-input-form">
                        <label>Beschrijving:</label>
                        <input
                            type="text"
                            className="input-field"

                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                        />
                        </div>
                        <div className="product-input-form">
                        <label>Prijs</label>
                        <input
                            type="number"
                            className="input-field"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                        </div>

                        <button type="submit" className="add-product-button">Product toevoegen</button>
                    </form>
                </div>
            </div>
        </LayoutHelper>
    );
}

export default AdminMenu;