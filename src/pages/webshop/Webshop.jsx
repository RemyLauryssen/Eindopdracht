import React, {useState} from "react";
import "./Webshop.css";
import ProductMap from "../../components/productmap/ProductMap.jsx";


function Webshop() {

    return (
        <main>
            <div className="webshop-introduction">
                <h1>Webshop</h1>
                <p>
                    Welkom bij de webshop van Celia's Kitchen. Hier kunt u uw favoriete producten bestellen en ophalen
                    wanneer het u uitkomt!
                </p>
            </div>
            <div className="webshop-main-container">
                <div className="product-catalog">
                    <ProductMap/>
                </div>


            </div>


        </main>
    );
}

export default Webshop;