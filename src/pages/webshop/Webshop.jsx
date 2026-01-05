import React from "react";
import "./Webshop.css";
import LogoPlaceholder from "../../assets/logo_placeholder.svg";

function Webshop() {
    return (
        <main>
            <div className="webshop-introduction">
            <h1>Webshop</h1>
            <p>
                Welkom bij de webshop van Celia's Kitchen. Hier kunt u uw favoriete producten bestellen en ophalen wanneer het u uitkomt!
            </p>
            </div>
            <div className="webshop-main-container">
            <div className="product-catalog">
                <div className="product-card">
                    <img src={LogoPlaceholder} alt="Placeholder image"/>
                    <h4>Placeholder artikel</h4>
                    <p>Blablabla de lekkerste gerechten</p>
                </div>
                <div className="product-card">
                    <img src={LogoPlaceholder} alt="Placeholder image"/>
                </div>
                <div className="product-card">
                    <img src={LogoPlaceholder} alt="Placeholder image"/>
                </div>


            </div>

            </div>
        </main>
    );
}

export default Webshop;