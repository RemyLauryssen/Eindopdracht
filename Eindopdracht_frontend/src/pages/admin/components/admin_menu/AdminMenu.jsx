import "./AdminMenu.css";
import React, {useState} from "react";
import adminApi from "../../../../constants/admin_api/AdminApi.jsx";
import UseMenuItems from "../../../../hooks/UseMenuItems.jsx";

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
            const normalizedPrice = parseFloat(productPrice.replace(",", "."));

            await adminApi.post("/menu", {
                name: productName,
                description: productDescription,
                price: normalizedPrice,
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
        <>
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
                                            <>
                                                <div className="menu-delete-container">
                                                    <article className="menu-item" key={menuItem.id}>
                                                        <div className="title-price-container">
                                                            <h3>{menuItem.name}</h3>
                                                            <strong>
                                                                € {menuItem.price.toLocaleString("nl-NL", {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            })}
                                                            </strong>
                                                        </div>
                                                        <p className="menu-description">{menuItem.description}</p>
                                                    </article>
                                                    <div className="delete-button-container">
                                                        <button type="button" className="delete-button"
                                                                onClick={() => deleteMenuItem(menuItem.id)}>
                                                            X
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                })}
                            </div>
                            <div className="dish-container">
                                <h2>Gebakjes en deegwaren</h2>
                                {menuItems.map((menuItem) => {
                                    if (menuItem.dish === "pastries") {
                                        return (
                                            <>
                                                <div className="menu-delete-container">
                                                    <article className="menu-item" key={menuItem.id}>
                                                        <div className="title-price-container">{menuItem.name}

                                                            <strong className="pastries-price">
                                                                € {menuItem.price.toLocaleString("nl-NL", {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            })}</strong>
                                                        </div>
                                                        <p className="menu-description">{menuItem.description}</p>
                                                    </article>
                                                    <div className="delete-button-container">
                                                        <button type="button" className="delete-button"
                                                                onClick={() => deleteMenuItem(menuItem.id)}>
                                                            X
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
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
                                                <>
                                                    <div className="menu-delete-container">
                                                        <article className="menu-item" key={menuItem.id}>
                                                            <div className="title-price-container">{menuItem.name}
                                                                <strong
                                                                    className="extras-price"> € {menuItem.price.toLocaleString("nl-NL", {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2,
                                                                })}</strong>
                                                            </div>
                                                        </article>
                                                        <div className="delete-button-container">
                                                            <button type="button" className="delete-button"
                                                                    onClick={() => deleteMenuItem(menuItem.id)}>
                                                                X
                                                            </button>

                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </>
                    )
                    }
                </div>
                <div className="vertical-separator"/>
                <div className="menu-right-side">
                    <h2 className="admin-title">Een product toevoegen</h2>
                    {error && <p className="error-message">Toevoegen is mislukt</p>}

                    <form onSubmit={addMenuItem}
                          className="menu-form-container product-input-form">
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
                                type="text"
                                className="input-field"
                                value={productPrice}
                                onChange={(e) => {
                                    const value = e.target.value
                                        .replace(/[^0-9.,]/g, "")
                                        .replace(/([.,].*)[.,]/g, "$1");
                                    setProductPrice(value);
                                }}
                                required
                            />
                        </div>

                        <button type="submit" className="add-product-button">Product toevoegen
                        </button>
                        {addSuccess && <p className="success-message">Product is toegevoegd!</p>}
                    </form>
                </div>
            </div>
        </>
    )
        ;
}

export default AdminMenu;