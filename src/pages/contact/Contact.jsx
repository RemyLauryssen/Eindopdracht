import React from "react";
import "./Contact.css";


function Contact() {

    return (
        <main className="outer-container">
            <h1>Contact</h1>
            <div className="main-container">

                <div className="contact-container">
                    <h2>Locatie</h2>
                    <p>Lorum ipsum</p>
                    <p>Lorum ipsum</p>
                </div>
                <div className="contact-container">
                    <h2>Contactgegevens</h2>
                    <p>Lorum ipsum</p>
                    <p>Lorum ipsum</p>
                </div>
                <div className="contact-container">
                    <h2>Openingstijden</h2>
                    <p>Lorum ipsum</p>
                </div>
            </div>
            <section>
                <h2>Reserveren</h2>
                <form onSubmit="">
                    <div className="reservation-form-container">
                        <div className="reservation-input-field">
                            <label htmlFor="first-name">Voornaam:</label>
                            <input type="text"/>
                        </div>
                        <div className="reservation-input-field">
                            <label htmlFor="last-name">Achternaam:</label>
                            <input type="text"/>
                        </div>
                        <div className="reservation-input-field">
                            <label htmlFor="email-address">E-mailadres:</label>
                            <input type="email"/>
                        </div>
                        <div className="reservation-input-field">
                            <fieldset>
                                <legend>Dieetwensen/allergieën:</legend>

                                <div>
                                    <input className="allergies-checkboxes" type="checkbox" id="gluten" name="gluten" checked/>
                                    <label htmlFor="gluten">Glutenvrij (standaard)</label>
                                </div>

                                <div>
                                    <input className="allergies-checkboxes" type="checkbox" id="vegetarian" name="vegetarian"/>
                                    <label htmlFor="vegetarian">Vegetarisch</label>
                                </div>
                                <div>
                                    <input className="allergies-checkboxes" type="checkbox" id="vegan" name="vegan"/>
                                    <label htmlFor="vegan">Veganistisch</label>
                                </div>
                                <div>
                                    <input className="allergies-checkboxes" type="checkbox" id="nuts" name="nuts"/>
                                    <label htmlFor="nuts">Noten/zaden</label>
                                </div>
                                <div>
                                    <input className="allergies-checkboxes" type="checkbox" id="lactose" name="lactose"/>
                                    <label htmlFor="lactose">Lactose</label>
                                </div>
                                <div>
                                    <input className="allergies-checkboxes" type="checkbox" id="crustaceans" name="crustaceans"/>
                                    <label htmlFor="crustaceans">Schaaldieren</label>
                                </div>
                            </fieldset>
                        </div>
                        <div className="reservation-input-field">
                            <label htmlFor="reservation-date">Datum:</label>
                            <input type="datetime-local" id="reservation-date-time" name="reservation-datetime"/>
                        </div>
                        <div className="reservation-input-field">
                            <button type="submit">Verzenden</button>
                        </div>

                    </div>
                </form>

            </section>
        </main>
    );
}

export default Contact;