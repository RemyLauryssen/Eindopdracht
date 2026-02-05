import React, {useState, useEffect} from 'react';
import axios from 'axios';

function UseReservationDetails(url) {
    const [reservationDetails, setReservationDetails] = useState([]);

    const fetchReservationDetails = async () => {
        const response = await axios.get(url);
        setReservationDetails(response.data);
    };

    useEffect(() => {
        fetchReservationDetails();
    }, [url]);

    return { reservationDetails, refetch: fetchReservationDetails };
}

export default UseReservationDetails;