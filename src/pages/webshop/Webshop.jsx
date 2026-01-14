import React, {useEffect, useState} from "react";
import "./Webshop.css";
import LogoPlaceholder from "../../assets/logo_placeholder.svg";
import axios from 'axios';
import Button from "./components/Button.jsx";
import Product from "../product/Product.jsx";
import placeholderData from "../product/placeholderData.json";

function Webshop() {
    const [product, setProducts] = useState([]);
    const [endpoint, setEndpoint] = useState({placeholderData})
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchData() {
            toggleLoading(true);
            toggleError(false);

            try {
                const {data} = await placeholderData(endpoint, {
                    signal: controller.signal,
                });
                setProducts(data);
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
        fetchData();

        return function cleanup() {
            controller.abort();
        }
    }, [endpoint]);

    return (
        <div className="webshop-main-container">
            {product &&
                <>
                    <img alt="logo" width="400px" src={LogoPlaceholder}/>
                    <section className="button-bar">
                        <Button
                            disabled={!product.previous}
                            clickHandler={() => setEndpoint(product.previous)}
                        >
                            Vorige
                        </Button>
                        <Button
                            disabled={!product.next}
                            clickHandler={() => setEndpoint(product.next)}
                        >
                            Volgende
                        </Button>
                    </section>

                    {product.results && product.results.map((product) => {
                        return <Product key={product.name} endpoint={product.url}/>
                    })}
                </>
            }
            {loading && <p>Loading...</p>}
            {product.length === 0 && error && <p>De gegevens konden niet worden opgehaald...</p>}
        </div>
    );
}

export default Webshop;