import React from "react";
import CompanyLogo from "../../assets/logo/Celia\'s.svg";
import "./Menu.css";
import UseMenuItems from "../../hooks/UseMenuItems.jsx";

export default function Menu() {
    const {menuItems} = UseMenuItems("http://localhost:8080/menu");
    return (
        <section className="menu-container">
                <img className="menu-logo" src={CompanyLogo} alt="Logo van het restaurant"/>
                <h1>Menukaart</h1>
                <div className="menu-groups">
                    <div className="dish-container">
                        <h2>Lunchgerechten</h2>
                        {menuItems.map((menuItem) => {
                            if (menuItem.dish === "lunch") {
                                return (
                                    <article className="menu-item" key={menuItem.id}>
                                        <div className="title-price-container">
                                            <h3>{menuItem.name}</h3>
                                            <strong>
                                                € {menuItem.price.toLocaleString("nl-NL", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                            </strong>
                                        </div>
                                        <p className="menu-description">{menuItem.description}</p>
                                    </article>
                                )
                            }
                        })}
                    </div>
                    <div className="dish-container">
                        <h2>Gebakjes en deegwaren</h2>
                        {menuItems.map((menuItem) => {
                            if (menuItem.dish === "pastries") {
                                return (
                                    <article className="menu-item" key={menuItem.id}>
                                        <div className="title-price-container">
                                            <h3>{menuItem.name}</h3>
                                            <strong className="pastries-price">
                                                € {menuItem.price.toLocaleString("nl-NL", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}</strong></div>
                                        <p className="menu-description">{menuItem.description}</p>

                                    </article>
                                )
                            }
                        })}
                    </div>
                    <div className="dish-container">
                        <h2>Drankjes</h2>
                        {
                            menuItems.map((menuItem) => {
                                if (menuItem.dish === "drinks") {
                                    return (
                                        <article className="menu-item" key={menuItem.id}>
                                            <div className="title-price-container">
                                                <h3>{menuItem.name}</h3>
                                                <strong
                                                    className="extras-price"> € {menuItem.price.toLocaleString("nl-NL", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}</strong>
                                            </div>
                                        </article>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </section>
    );
}