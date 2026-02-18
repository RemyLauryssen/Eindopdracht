import { useState } from "react";
import axios from "axios";

export function useProducts() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [addSuccess, setAddSuccess] = useState(false);

    async function addProduct(formData) {
        setLoading(true);
        setError(null);
        setAddSuccess(false);

        try {
            const response = await axios.post("/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setAddSuccess(true);
            return response.data;
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return { addProduct, loading, error, addSuccess };
}