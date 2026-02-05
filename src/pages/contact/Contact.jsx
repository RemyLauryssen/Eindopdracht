import React, {useState} from "react";
import "./Contact.css";
import axios from "axios";


function Contact() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [dinnerGuests, setDinnerGuests] = useState("");
    const [reservationDateTime, setReservationDateTime] = useState("");
    const [addSuccess, toggleAddSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function PostReservationDetails(e) {
        e.preventDefault();
        console.log(firstName, lastName, emailAddress, reservationDateTime, dinnerGuests);
        setError(false);

        try {
            const response = await axios.post("http://localhost:8080/reservation-details", {
                firstName: firstName,
                lastName: lastName,
                emailAddress: emailAddress,
                reservationDateTime: reservationDateTime,
                numberOfGuests: Number(dinnerGuests)
            });
            console.log(response.data);
            toggleAddSuccess(true)
            setFirstName("");
            setLastName("");
            setEmailAddress("");
            setDinnerGuests("");
            setReservationDateTime("");

            } catch (error) {
            console.error(error);
        }
    }



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
                <form onSubmit={PostReservationDetails}>
                    <div className="reservation-form-container">
                        <div className="reservation-input-field">
                            <label htmlFor="first-name">Voornaam:</label>
                            <input
                                type="text"
                                name="first-name-field"
                                id="first-name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="reservation-input-field">
                            <label htmlFor="last-name">Achternaam:</label>
                            <input
                                type="text"
                                name="last-name-field"
                                id="last-name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="reservation-input-field">
                            <label htmlFor="email-address">E-mailadres:</label>
                            <input
                                type="email"
                                name="email-address-field"
                                id="email-address"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                            />
                        </div>
                        <div className="reservation-input-field">
                            <label htmlFor="dinner-guests">Aantal personen:</label>
                            <input
                                type="number"
                                name="dinner-guests-field"
                                id="dinner-guests"
                                value={dinnerGuests}
                                onChange={(e) => setDinnerGuests(e.target.value)}
                            />
                        </div>
                        <div className="reservation-input-field">
                            {/*<fieldset>*/}
                            {/*    <legend>Dieetwensen/allergieën:</legend>*/}

                            {/*    <div>*/}
                            {/*        <input className="allergies-checkboxes" type="checkbox" id="gluten" name="gluten"*/}
                            {/*               checked/>*/}
                            {/*        <label htmlFor="gluten">Glutenvrij (standaard)</label>*/}
                            {/*    </div>*/}

                            {/*    <div>*/}
                            {/*        <input className="allergies-checkboxes" type="checkbox" id="vegetarian"*/}
                            {/*               name="vegetarian"/>*/}
                            {/*        <label htmlFor="vegetarian">Vegetarisch</label>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <input className="allergies-checkboxes" type="checkbox" id="vegan" name="vegan"/>*/}
                            {/*        <label htmlFor="vegan">Veganistisch</label>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <input className="allergies-checkboxes" type="checkbox" id="nuts" name="nuts"/>*/}
                            {/*        <label htmlFor="nuts">Noten/zaden</label>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <input className="allergies-checkboxes" type="checkbox" id="lactose"*/}
                            {/*               name="lactose"/>*/}
                            {/*        <label htmlFor="lactose">Lactose</label>*/}
                            {/*    </div>*/}
                            {/*    <div>*/}
                            {/*        <input className="allergies-checkboxes" type="checkbox" id="crustaceans"*/}
                            {/*               name="crustaceans"/>*/}
                            {/*        <label htmlFor="crustaceans">Schaaldieren</label>*/}
                            {/*    </div>*/}
                            {/*</fieldset>*/}
                        </div>
                        <div className="reservation-input-field">
                            <label htmlFor="reservation-date-time">Datum en tijd:</label>
                            <input
                                type="datetime-local"
                                id="reservation-date-time"
                                name="reservation-datetime-field"
                                value={reservationDateTime}
                                onChange={(e) => setReservationDateTime(e.target.value)}
                            />
                        </div>
                        <div className="reservation-input-field">
                            <button type="submit">Verzenden</button>
                            {addSuccess === true && <p className="success-message">Reservering verzonden...</p>}
                        </div>

                    </div>
                </form>

            </section>
        </main>
    );
}

export default Contact;