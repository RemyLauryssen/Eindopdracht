import React from "react";
import CompanyLogo from "../../assets/company-logo.jpg";
import Mains from "./components/Mains.jsx";
import Extras from "./components/Extras.jsx";
import {Provider} from "./Context.jsx";
import {mains, sides, drinks} from "./data";

import "./Menu.css";

export default function Menu() {
    return (
<div className="full-menu">
        <Provider>
<div className="menu-container">
            <section>
                <img className="menu-logo" src={CompanyLogo} alt="Logo van het restaurant"/>
                <Mains meals={mains}/>
            </section>
            <section className="extras-drinks-container">
                    <Extras type="Bijgerechten" items={sides}/>
                    <Extras type="Drankjes" items={drinks}/>
                    </section>
</div>

        </Provider>
</div>
    );
}
