import "./Payment.css";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedBank, setSelectedBank] = useState("");
    const [addSuccess, toggleAddSuccess] = useState(false);

    const {basket, total, customer} = location.state || {};

    useEffect(() => {
        if (!basket || basket.length === 0 || !customer) {
            navigate("/basket");
        }
    }, [basket, customer, navigate]);

    const handlePayment = async () => {

        if (!selectedBank) {
            alert("Kies een bank.");
            return;
        }

        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch("http://localhost:8080/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    customerName: customer.name,
                    customerEmail: customer.email,
                    items: basket.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity
                    })),
                    paymentMethod: selectedBank
                })
            });

            if (!response.ok) {
                throw new Error("Bestelling mislukt");
            }

            const data = await response.json();
            console.log(data);
            toggleAddSuccess(true);
            localStorage.removeItem("basketItems");

        } catch (error) {
            console.error(error);
            alert("Er ging iets mis bij het betalen.");
        }
    };

    return (
        <main>
            <h1>Betaalpagina</h1>
            <div className="payment-page">
                <div className="payment-total">
                    Totaalbedrag: €
                    {total?.toLocaleString("nl-NL", {
                        minimumFractionDigits: 2,
                    })}
                </div>
                <div className="bank-selection">
                    <label htmlFor="bank-selection">Kies uw bank:</label>
                    <select
                        name="banks"
                        id="bank-selection"
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                    >
                        <option value="">--Maak een keuze--</option>
                        <option value="ABN-Amro">ABN-Amro</option>
                        <option value="ASN-bank">ASN Bank</option>
                        <option value="Bunq">Bunq</option>
                        <option value="ING-bank">ING Bank</option>
                        <option value="Knab">Knab</option>
                        <option value="Rabobank">Rabobank</option>
                        <option value="Regiobank">Regiobank</option>
                        <option value="Triodos-bank">Triodos BANK</option>
                    </select>
                </div>
                <button type="submit" className="payment-button" onClick={handlePayment}>Betalen</button>
                {addSuccess === true && <p className="success-message">Bestelling geplaatst...</p>}
            </div>
        </main>
    );
}

export default Payment;