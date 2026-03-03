import React from "react";
import "./Homepage.css";
import EmblaCarousel from "../../components/image_carousel/EmblaCarousel.jsx";
import "../../components/image_carousel/Base.css";
import "../../components/image_carousel/Embla.css"


const OPTIONS = {loop: true, align: "center", dragFree: false}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


function Homepage() {
    return (
        <section className="homepage-container">
            <h1>Celia's Kitchen</h1>
            <p>
                Bij Celia's Kitchen kunt u volop genieten van de lekkerste, glutenvrije maaltijden, speciaal
                voor u bereid!
            </p>
            <div className="homepage-carousel">
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
            <p>Celia's Kitchen staat bekend om zijn glutenvrije maaltijden en speciale dieetwensen voor
                iedereen!</p>
        </section>
    );
}

export default Homepage;