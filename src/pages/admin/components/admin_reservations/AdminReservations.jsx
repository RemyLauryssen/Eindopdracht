import "./AdminReservations.css";
import UseReservationDetails from "../../../../hooks/UseReservationDetails.jsx";
import React, { useState } from "react";
import axios from "axios";

function AdminReservations() {
    const { reservationDetails, refetch } = UseReservationDetails("http://localhost:8080/reservation-details");
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");

    const pendingReservations = reservationDetails.filter(r => r.status === "PENDING");

    const approvedReservations = reservationDetails
        .filter(r => r.status === "APPROVED")
        .sort((a, b) => new Date(a.reservationDateTime) - new Date(b.reservationDateTime));

    const approvedByDate = approvedReservations.reduce((groups, reservation) => {
        const date = new Date(reservation.reservationDateTime).toLocaleDateString("nl-NL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        if (!groups[date]) groups[date] = [];
        groups[date].push(reservation);
        return groups;
    }, {});

    async function handleStatusUpdate(reservationId, status, emailAddress, reservationDateTime) {
        setLoading(reservationId);
        setError(null);

        try {
            if (status === "DENIED") {
                await axios.delete(`http://localhost:8080/reservation-details/${reservationId}`);
            } else {

                await axios.patch(
                    `http://localhost:8080/reservation-details/${reservationId}/status`,
                    { status: status },
                    { headers: { "Content-Type": "application/json" } }
                );
            }

            // Normaal gesproken zou er nu een e-mail worden verstuurd om de reservering te bevestigen,
            // maar omdat ik er helaas geen tijd meer voor heb en ook geen nieuwe e-mailadressen wil aanmaken
            // voor het testen, doe ik het maar even zo ✌️
            console.log(`\n=== Voorbeeld van verstuurde email ===\n
            Aan: ${emailAddress}\n
            Reserveringsnummer: ${reservationId}\n
            Datum/tijd: ${new Date(reservationDateTime).toLocaleString("nl-NL", {
                dateStyle: "long",
                timeStyle: "short",
            })}\n
            Bericht: ${message}\n
            =================================`);
            setMessage("");
            await refetch();
        } catch (error) {
            console.error("Status update mislukt", error);
            setError("Status niet bijgewerkt");
        } finally {
            setLoading(null);
        }
    }

    return (
        <div className="reservation-page-container">
            <h2>Binnengekomen reserveringen:</h2>
            {error && <p className="error-message">{error}</p>}
            <section className="reservation-card-container">
                {pendingReservations.map((reservationItem) => (
                    <article className="reservation-card" key={reservationItem.id}>
                        <p>Naam: {reservationItem.lastName}, {reservationItem.firstName}</p>
                        <p>
                            Datum/tijd: {new Date(reservationItem.reservationDateTime).toLocaleString("nl-NL", {
                            dateStyle: "long",
                            timeStyle: "short",
                        })}
                        </p>
                        <p>Aantal personen: {reservationItem.numberOfGuests}</p>
                        <p>E-mailadres: {reservationItem.emailAddress}</p>
                        <p>Status: {reservationItem.status}</p>

                        <textarea
                            placeholder="Voeg een korte boodschap toe..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button
                            disabled={loading === reservationItem.id}
                            onClick={() => handleStatusUpdate(reservationItem.id, "APPROVED", reservationItem.emailAddress, reservationItem.reservationDateTime)}
                        >
                            Bevestigen
                        </button>
                        <button
                            disabled={loading === reservationItem.id}
                            onClick={() => handleStatusUpdate(reservationItem.id, "DENIED", reservationItem.emailAddress, reservationItem.reservationDateTime)}
                        >
                            Afwijzen
                        </button>
                    </article>
                ))}
            </section>

            <h2>Bevestigde reserveringen:</h2>
            {Object.keys(approvedByDate).map((date) => (
                <div key={date}>
                    <h3>{date}</h3>
                    <section className="reservation-card-container">
                        {approvedByDate[date].map((reservationItem) => (
                            <article className="reservation-card" key={reservationItem.id}>
                                <p>Naam: {reservationItem.lastName}, {reservationItem.firstName}</p>
                                <p>
                                    Tijd: {new Date(reservationItem.reservationDateTime).toLocaleTimeString("nl-NL", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                                </p>
                                <p>Aantal personen: {reservationItem.numberOfGuests}</p>
                                <p>E-mailadres: {reservationItem.emailAddress}</p>
                            </article>
                        ))}
                    </section>
                </div>
            ))}
        </div>
    );
}

export default AdminReservations;