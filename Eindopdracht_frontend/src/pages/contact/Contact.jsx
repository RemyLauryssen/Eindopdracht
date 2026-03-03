import React, {useState} from "react";
import "./Contact.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Contact() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [dinnerGuests, setDinnerGuests] = useState("");
    const [reservationDateTime, setReservationDateTime] = useState(null);
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
                reservationDateTime: reservationDateTime?.toISOString(),
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
        <div className="outer-container">
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
                            <label htmlFor="reservation-date-time">Datum en tijd:</label>
                            <div className="custom-datepicker">
                                <DatePicker
                                    selected={reservationDateTime}
                                    onChange={(date) => setReservationDateTime(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={30}
                                    timeCaption="Tijd"
                                    dateFormat="dd-MM-yyyy HH:mm"
                                    minDate={new Date()}
                                    placeholderText="Selecteer datum en tijd"
                                    className="datepicker-input"
                                    wrapperClassName="datepicker-wrapper"
                                />
                            </div>
                        </div>
                        <div className="reservation-input-field">
                            <button type="submit">Verzenden</button>
                            {addSuccess === true && <p className="success-message">Reservering verzonden...</p>}
                        </div>

                    </div>
                </form>

            </section>
        </div>
    );
}

export default Contact;