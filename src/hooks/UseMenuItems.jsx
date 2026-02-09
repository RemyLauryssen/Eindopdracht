import { useState, useEffect } from "react";
import adminApi from "../constants/admin_api/AdminApi.jsx";

function UseMenuItems(endpoint) {
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const refetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminApi.get(endpoint);
            setMenuItems(response.data);
        } catch (err) {
            console.error("Failed to fetch menu items", err);
            setError(err.response?.data?.message || "Fout bij laden menu");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, [endpoint]);

    return { menuItems, refetch, loading, error };
}

export default UseMenuItems;