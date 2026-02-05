import "./AdminMenu.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import UseMenuItems from "../../../../hooks/UseMenuItems.jsx";


function AdminMenu() {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [dishType, setDishType] = useState("mains");
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [error, toggleError] = useState(false);
    const [loading, toggleLoading] = useState(false);


    async function addMenuItem() {
        console.log(productName, productDescription, productPrice, dishType);
        toggleError(false);

        try {
            const response = await axios.post("http://localhost:8080/menu", {
                name: productName, description: productDescription, price: productPrice, dish: dishType
            });
            console.log(response.data);
            toggleAddSuccess(true);
        } catch (e) {
            console.error(e);
            toggleError(e);
        }
    }

    const {menuItems, refetch} = UseMenuItems("http://localhost:8080/menu");

    async function deleteMenuItem(id) {

        try {
            await axios.delete(`http://localhost:8080/menu/${id}`);
            await refetch();
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
            <div className="menu-page-container">
                <div className="menu-left-side">
                    <div className="menu-title">
                        <h2>Huidig menu</h2>
                    </div>
                    <h3>Hoofdgerechten</h3>
                    {menuItems.map((menuItem) => {
                        if (menuItem.dish === "mains") {
                            return (
                                <article className="menu-item" key={menuItem.id}>
                                    <h4 className="mains-name">{menuItem.name}</h4>
                                    <div className="price-container">
                                        <strong>€ {menuItem.price.toFixed(2).toLocaleString("nl")}</strong>
                                    </div>
                                    <p className="mains-description">{menuItem.description}</p>
                                    <button className="delete-button" type="button"
                                            onClick={() => deleteMenuItem(menuItem.id)}>X
                                    </button>
                                </article>
                            )
                        }
                    })}
                    <h3>Bijgerechten</h3>
                    {menuItems.map((menuItem) => {
                        if (menuItem.dish === "extras") {
                            return (
                                <>
                                    <article className="menu-item" key={menuItem.id}>
                                        <div className="extras-name">{menuItem.name}</div>
                                        <strong className="extras-price">€ {menuItem.price.toFixed(2).toLocaleString("nl")}</strong>
                                    </article>
                                    <div>
                                        <button className="delete-button" type="button"
                                                onClick={() => deleteMenuItem(menuItem.id)}>X
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    })}
                    <h3>Drankjes</h3>
                    {menuItems.map((menuItem) => {
                        if (menuItem.dish === "drinks") {
                            return (
                                <>
                                    <article className="menu-item" key={menuItem.id}>
                                        <div className="extras-name">{menuItem.name}</div>
                                        <strong className="extras-price">€ {menuItem.price.toFixed(2).toLocaleString("nl")}</strong>
                                    </article>
                                    <div>
                                        <button className="delete-button" type="button"
                                                onClick={() => deleteMenuItem(menuItem.id)}>X
                                        </button>
                                    </div>
                                </>
                            )
                        }
                    })}
                </div>
                <span className="vertical-line">
            </span>
                <div className="menu-right-side">
                    <div>
                        <h2>Een product toevoegen</h2>
                        {addSuccess === true && <p className="success-message">Product is toegevoegd!</p>}

                        <form onSubmit={addMenuItem} className="menu-form-container">
                            <div className="radio-button-container">
                                <label htmlFor="mains">
                                    <input
                                        type="radio"
                                        id="mains"
                                        name="menu-product"
                                        value="mains"
                                        checked={dishType === "mains"}
                                        onChange={(e) => setDishType(e.target.value)}
                                    />
                                    Hoofdgerecht
                                </label>
                                <label htmlFor="extras">
                                    <input
                                        type="radio"
                                        id="extras"
                                        name="menu-product"
                                        value="extras"
                                        checked={dishType === "extras"}
                                        onChange={(e) => setDishType(e.target.value)}
                                    />
                                    Bijgerecht
                                </label>
                                <label htmlFor="drinks">
                                    <input
                                        type="radio"
                                        id="drinks"
                                        name="menu-product"
                                        value="drinks"
                                        checked={dishType === "drinks"}
                                        onChange={(e) => setDishType(e.target.value)}
                                    />
                                    Drankje
                                </label>
                            </div>
                            <label htmlFor="product-name">
                                <div className="input-title">
                                    Naam:
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="product-name-field"
                                        id="product-name"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}/>
                                </div>
                            </label>
                            <label htmlFor="product-description">
                                <div className="input-title">
                                    Beschrijving:
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="product-description-field"
                                        id="product-description"
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}/>
                                </div>
                            </label>
                            <label htmlFor="product-price">
                                <div className="input-title">
                                    Prijs:
                                </div>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="product-price-field"
                                        id="product-price"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}/>
                                </div>
                            </label>
                            <button className="submit-button" type="submit">
                                Product toevoegen
                            </button>
                        </form>
                    </div>
                </div>
                {error && <p className="error-message">Toevoegen is mislukt. Probeer het opnieuw</p>}
            </div>
        </>)
}


export default AdminMenu;