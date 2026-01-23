import "./ProductMap.css";

import {webshopProduct} from "./WebshopProduct.js";



function ProductMap() {

return (
        webshopProduct.map((webshopProduct) => {
            return (
            (<div key={webshopProduct.id}>
                <div className="product-card">
                    <img src={webshopProduct.image}
                         alt="placeholder image"
                         className="product-image"/>
                    <h4 className={webshopProduct.name}>{webshopProduct.name}</h4>
                    <p>{webshopProduct.shortDescription}</p>
                </div>

            </div>
            ))
        })

    )
}

export default ProductMap;
