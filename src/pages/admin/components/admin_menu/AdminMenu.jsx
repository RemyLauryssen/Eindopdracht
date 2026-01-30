import "./AdminMenu.css";
import {useState} from "react";
import axios from "axios";


function AdminMenu() {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productType, setProductType] = useState("mains")
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [error, setError] = useState(null);

    async function addMenuItem(e) {
        e.preventDefault();
        console.log(productName, productDescription, productPrice, productType);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/menu', {
                name: productName, description: productDescription, price: productPrice, type: productType
            });
            console.log(response.data);
            toggleAddSuccess(true);

        } catch (e) {
            console.error(e);
            setError(e);
        }
    }

    return (

        <div className="menu-page-container">
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
                            checked={productType === "mains"}
                            onChange={(e) => setProductType(e.target.value)}
                        />
                        Hoofdgerecht
                    </label>
                    <label htmlFor="extras">
                        <input
                            type="radio"
                            id="extras"
                            name="menu-product"
                            value="extras"
                            checked={productType === "extras"}
                            onChange={(e) => setProductType(e.target.value)}
                        />
                        Bijgerecht
                    </label>
                    <label htmlFor="drinks">
                        <input
                            type="radio"
                            id="drinks"
                            name="menu-product"
                            value="drinks"
                            checked={productType === "drinks"}
                            onChange={(e) => setProductType(e.target.value)}
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
            {error && <p className="error-message">Toevoegen is mislukt. Probeer het opnieuw</p>}
        </div>);
}

export default AdminMenu;