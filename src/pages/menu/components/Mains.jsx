import React from "react";

export default function Mains({ meals }) {
    return (
        <>
        <h2>Hoofdgerechten</h2>
        <section className="mains">
            {meals.map((meal, index) => (
                <article className="menu-item" key={index}>
                    <h3 className="mains-name">{meal.name}</h3>
                    <div className="price-container">
                    <strong>€ {meal.price}</strong>
                    </div>
                    <p className="mains-description">{meal.description}</p>
                </article>
            ))}
        </section>
        </>
    );
}
