import { useState, useEffect } from "react";
import adminApi from "../constants/admin_api/AdminApi.jsx";

function UseReservationDetails(endpoint) {
    const [reservationDetails, setReservationDetails] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const refetch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminApi.get(endpoint);
            setReservationDetails(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Fout bij laden reserveringen");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refetch();
    }, [endpoint]);

    return { reservationDetails, refetch, loading, error };
}

export default UseReservationDetails;
