import React, {useState, useEffect} from 'react';
import axios from 'axios';
const UseMenuItems = (url) => {

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        async function fetchMenuItems() {
            try {
                const response = await axios.get(url);
                setMenuItems(response.data);
                console.log(response.data);
            } catch(e) {
                console.error(e);
            }
        }
        void fetchMenuItems()
    }, []);
    return { menuItems }
};

export default UseMenuItems;