import React, {useEffect, useState} from "react";
import "./Webshop.css";
import axios from "axios";
import "../../hooks/UseProducts.jsx";


function Webshop() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const response = await axios.get("http://localhost:8080/products");
            setProducts(response.data);
        } catch (e) {
            console.error(e);
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
                    {products.map(product => (
                        <li key={product.id} className="product-card">
                            <img
                                src={`http://localhost:8080/products/${product.id}/image`}
                                alt={product.name}
                                className="product-image"
                            />
                            <h4>{product.name}</h4>
                            <p>{product.shortDescription}</p>
                            <p>
                                € {product.price.toLocaleString("nl-NL", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default Webshop;