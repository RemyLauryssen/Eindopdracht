import React, {useContext} from "react";
import CompanyLogo from "../../assets/logo/Celia's.svg";
import "./Menu.css";
import UseMenuItems from "../../hooks/UseMenuItems.jsx";
import {AuthenticationContext} from "../../context/AuthenticationContext.jsx";
import LayoutHelper from "../../components/layout-helper/LayoutHelper.jsx";

export default function Menu() {
    const {menuItems} = UseMenuItems("http://localhost:8080/menu");
    return (
            <LayoutHelper>

                <section className="menu-container">
                    <img className="menu-logo" src={CompanyLogo} alt="Logo van het restaurant"/>
                    <h1>Menukaart</h1>
                    <div>
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
                                            <div className="title-price-container">{menuItem.name}

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
                                                <div className="title-price-container">{menuItem.name}
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
        </LayoutHelper>)
        ;
}