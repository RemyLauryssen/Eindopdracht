import React, {useState} from "react";
import "./Webshop.css";
import Product from "../product/Product.jsx"

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
        <Product/>

                </div>


            </div>


        </main>
    );
}

export default Webshop;