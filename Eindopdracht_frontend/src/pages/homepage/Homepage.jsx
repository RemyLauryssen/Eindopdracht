import React, {useContext} from "react";
import "./Homepage.css";
import EmblaCarousel from "../../components/image_carousel/EmblaCarousel.jsx";
import "../../components/image_carousel/Base.css";
import "../../components/image_carousel/Embla.css"
import {AuthenticationContext} from "../../context/AuthenticationContext.jsx";
import LayoutHelper from "../../components/layout-helper/LayoutHelper.jsx";


const OPTIONS = {loop: true, autoplay: true}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


function Homepage() {
    return (
        <LayoutHelper>
            <main>
                <section className="homepage-container">
                    <h1>Celia's Kitchen</h1>
                    <p>
                        Bij Celia's Kitchen kunt u volop genieten van de lekkerste, glutenvrije maaltijden, speciaal
                        voor u bereid!
                    </p>
                    <EmblaCarousel slides={SLIDES} options={OPTIONS}/>
                    <p>Celia's Kitchen staat bekend om zijn glutenvrije maaltijden en speciale dieetwensen voor
                        iedereen!</p>
                </section>
            </main>
        </LayoutHelper>
    );
}

export default Homepage;