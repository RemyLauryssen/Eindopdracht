import React, {useState, useEffect} from 'react';
import axios from 'axios';
const UseProducts = (url) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(url);
                setProducts(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        void fetchProducts()
    }, []);
    return { products }
};

export default UseProducts;