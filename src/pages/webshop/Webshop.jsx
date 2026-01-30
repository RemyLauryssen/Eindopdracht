import React, {useState} from "react";
import "./Webshop.css";
import axios from "axios";
import useProducts from "../../hooks/UseProducts.jsx";


function Webshop() {
    // const [products, setProducts] = useState([]);
    // const [error, toggleError] = useState(false);
    // const [loading, toggleLoading] = useState(false);
    //
    // async function fetchProduct() {
    //     try {
    //         toggleLoading(true);
    //         toggleError(false);
    //         const response = await axios.get("http://localhost:8080/products");
    //         console.log(response.data);
    //         setProducts(response.data);
    //     } catch (error) {
    //         console.error(error);
    //         toggleError(true);
    //     } finally {
    //         toggleLoading(false);
    //     }
    // }
    const {products} = useProducts('http://localhost:8080/products')

    return (
        <main>
            {console.log(products)}
            <div className="webshop-introduction">
                <h1>Webshop</h1>
                <p>
                    Welkom bij de webshop van Celia's Kitchen. Hier kunt u uw favoriete producten bestellen en ophalen
                    wanneer het u uitkomt!</p>



            </div>

            <div className="webshop-main-container">
                <div className="product-catalog">

                        <ul className="outer-container">
                            {products.map((product) => {
                                return (
                                    <div key={product.id}>
                                        <div className={`product-card ${product.name}`}>
                                            <img src={product.image}
                                                 alt="placeholder image"
                                                 className="product-image"/>
                                            <h4 className={product.name}>{product.name}</h4>
                                            <p>{product.shortDescription})</p>
                                        </div>
                                    </div>
                                )
                            })}

                        < /ul>

                </div>


            </div>


        </main>
    );
}

export default Webshop;