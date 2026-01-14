import './Product.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import placeholderData from "../product/placeholderData.json";


function Product({ endpoint }) {
    const [product, setProduct] = useState({});
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const { data } = placeholderData(endpoint, {
                    signal: controller.signal,
                });
                setProduct(data);
            } catch (e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled...');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        if (endpoint) {
            fetchData();
        }

        return () => {
            console.log('Unmount effect triggered');
            controller.abort();
        }

    }, []);


    return (
        <article className="product-card">
            {console.log('Trigger rerender')}
            {Object.keys(product).length > 0 &&
                <>
                    <h2>{product.name}</h2>
                    <img
                        alt="Placeholder image"
                        src={product.image}
                    />
                    <p><strong>Allergie-informatie: </strong>{product.allergies.length}</p>
                    <p><strong>Prijs: </strong>€ {product.price}</p>
                    <p><strong>Eigenschappen: </strong></p>
                    <ul>
                        {product.description.map((description) => {
                            return (
                                <li key={`${description.description.name}-${product.name}`}>
                                    {description.description.name}
                                </li>
                            )
                        })}
                    </ul>
                </>
            }
            {loading && <p>Bezig met laden...</p>}
            {Object.keys(product).length === 0 && error && <p>Fout bij ophalen van gegevens...</p>}
        </article>
    )
}

export default Product;