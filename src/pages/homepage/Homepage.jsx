import React from "react";
import "./Homepage.css";
import placeholder1 from "../../assets/600x400_1.svg";
import placeholder2 from "../../assets/600x400_2.svg";
import placeholder3 from "../../assets/600x400_3.svg";

function Homepage() {
    return (
        <main>
            <section>
            <h1>Homepage</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut debitis doloribus
                facilis iste placeat praesentium sint voluptatem. Architecto at, maiores?
            </p>
            </section>
            <section className="image-container">
                <img src={placeholder1} alt="Afbeelding restaurant"/>
                <img src={placeholder2} alt="Afbeelding restaurant"/>
                <img src={placeholder3} alt="Afbeelding restaurant"/>
            </section>

            <p>Lorum ipsum</p>
        </main>
    );
}

export default Homepage;