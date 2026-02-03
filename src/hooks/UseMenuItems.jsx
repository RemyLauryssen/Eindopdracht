import React, {useState, useEffect} from 'react';
import axios from 'axios';

function UseMenuItems(url) {
    const [menuItems, setMenuItems] = useState([]);

    const fetchMenu = async () => {
        const response = await axios.get(url);
        setMenuItems(response.data);
    };

    useEffect(() => {
        fetchMenu();
    }, [url]);

    return { menuItems, refetch: fetchMenu };
}

export default UseMenuItems;