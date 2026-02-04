import React from "react";
import CompanyLogo from "../../assets/company-logo.jpg";


import "./Menu.css";
import UseMenuItems from "../../hooks/UseMenuItems.jsx";

export default function Menu() {
    const {menuItems} = UseMenuItems("http://localhost:8080/menu");
    return (
        <div className="full-menu">

            <div className="menu-container">
                <section>
                    <img className="menu-logo" src={CompanyLogo} alt="Logo van het restaurant"/>
                    <h3>Hoofdgerechten</h3>
                    {menuItems.map((menuItem) => {
                        if (menuItem.dish === "mains") {
                            return (
                                <article className="menu-item" key={menuItem.id}>
                                    <h3 className="mains-name">{menuItem.name}</h3>
                                    <div className="price-container">
                                        <strong>
                                            € {menuItem.price.toLocaleString("nl-NL", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}</strong>
                                    </div>
                                    <p className="mains-description">{menuItem.description}</p>
                                </article>
                            )
                        }
                    })}
                    <h3>Bijgerechten</h3>
                    {menuItems.map((menuItem) => {
                        if (menuItem.dish === "extras") {
                            return (
                                <article className="menu-item" key={menuItem.id}>
                                    <div className="extras-name">{menuItem.name}</div>
                                    <strong className="extras-price">
                                        € {menuItem.price.toLocaleString("nl-NL", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                    </strong>
                                </article>
                            )
                        }
                    })}
                    <h3>Drankjes</h3>
                    {menuItems.map((menuItem) => {
                        if (menuItem.dish === "drinks") {
                            return (
                                <article className="menu-item" key={menuItem.id}>
                                    <div className="extras-name">{menuItem.name}</div>
                                    <strong className="extras-price"> € {menuItem.price.toLocaleString("nl-NL", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}</strong>
                                </article>
                            )
                        }
                    })}
                </section>
            </div>
        </div>
    );
}