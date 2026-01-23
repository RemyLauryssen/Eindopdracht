import "./Profile.css";
import {useContext, useState} from "react";
import {AuthenticationContext} from "../../context/AuthenticationContext.jsx";
import {Mockuser} from "./Mockuser.js";
import Product from "../../components/productmap/ProductMap.jsx";
import ProductMap from "../../components/productmap/ProductMap.jsx";

function Profile() {

    // const [userName, setUserName] = useState('')
    return (
        <>
        <h1>Profielpagina</h1>
            <h2 className="user-details-title">Gebruikersgegevens</h2>
        <p>Dit is de profielpagina van {Mockuser.name}</p>
            <section>
            <ul className="user-details">
                <li>
                    <h4>Naam:</h4>
                    <p>{Mockuser.name}</p>
                </li>
                <li>
                    <h4>Adres:</h4>
                    <p>{Mockuser.address}</p>
                </li>
                <li>
                    <h4>Postcode:</h4>
                    <p>{Mockuser.zipCode}</p>
                </li>
                <li>
                    <h4>Telefoonnummer:</h4>
                    <p>{Mockuser.phoneNumber}</p>
                </li>
            </ul>
            </section>

            <h2 className="user-details-title">Bestellingen</h2>
            
        </>
    )
}

export default Profile;