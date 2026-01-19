import React, {useState} from "react";
import "./Webshop.css";
import LogoPlaceholder from "../../assets/logo_placeholder.svg";
import {webshopProduct} from "./WebshopProduct.js";

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

                    {webshopProduct.map((webshopProduct) => {
                        return (<div key={webshopProduct.id}>
                            <div className="product-card">
                                <img src={webshopProduct.image}
                                     alt="placeholder image"
                                     className="product-image"/>
                                <h4 className={webshopProduct.name}>{webshopProduct.name}</h4>
                                <p>{webshopProduct.description}</p>
                            </div>

                        </div>)
                    })}


                    {/*    <img src={webshopProduct[0].image} alt="Placeholder image"/>*/}
                    {/*    <h4>{webshopProduct[0].name}</h4>*/}
                    {/*    <p>{webshopProduct[0].description}</p>*/}
                    {/*</div>*/}
                    {/*<div className="product-card">*/}
                    {/*    <img src={LogoPlaceholder} alt="Placeholder image"/>*/}
                    {/*</div>*/}
                    {/*<div className="product-card">*/}
                    {/*    <img src={LogoPlaceholder} alt="Placeholder image"/>*/}
                </div>


            </div>


        </main>
    );
}

export default Webshop;