import "./AdminReservations.css";
import UseReservationDetails from "../../../../hooks/UseReservationDetails.jsx";
import React, {useState} from "react";
import adminApi from "../../../../constants/admin_api/AdminApi.jsx";
import LayoutHelper from "../../../../components/layout-helper/LayoutHelper.jsx";

function AdminReservations() {
    const {reservationDetails, refetch, loading, error: fetchError} = UseReservationDetails("/reservation-details");
    const [loadingId, setLoadingId] = useState(null);
    const [messageMap, setMessageMap] = useState({});

    const pendingReservations = reservationDetails.filter(r => r.status === "PENDING");
    const approvedReservations = reservationDetails
        .filter(r => r.status === "APPROVED")
        .sort((a, b) => new Date(a.reservationDateTime) - new Date(b.reservationDateTime));

    const approvedByDate = approvedReservations.reduce((groups, reservation) => {
        const date = new Date(reservation.reservationDateTime).toLocaleDateString("nl-NL");
        if (!groups[date]) groups[date] = [];
        groups[date].push(reservation);
        return groups;
    }, {});

    async function handleStatusUpdate(reservationId, status, emailAddress, reservationDateTime) {
        setLoadingId(reservationId);

        try {
            if (status === "DENIED") {
                await adminApi.delete(`/reservation-details/${reservationId}`);
            } else {
                await adminApi.patch(`/reservation-details/${reservationId}/status`, {status});
            }

            console.log(`Voorbeeld e-mail: ${emailAddress}, Reservering ${reservationId}, Bericht: ${messageMap[reservationId] || ""}`);
            setMessageMap(prev => ({...prev, [reservationId]: ""}));
            await refetch();
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <LayoutHelper>

            <h1>Reserveringen</h1>
            <div className="reservation-page-container">
                <div className="reservation-left-side">
                    <h2>Binnengekomen reserveringen:</h2>

                    {loading && <p>Reserveringen worden geladen…</p>}
                    {fetchError && <p className="error-message">{fetchError}</p>}

                    {!loading && !fetchError && (
                        <section className="reservation-card-container">
                            {pendingReservations.map(r => (
                                <article key={r.id} className="reservation-card">
                                    <p>Naam: {r.lastName}, {r.firstName}</p>
                                    <p>Datum/tijd: {new Date(r.reservationDateTime).toLocaleString("nl-NL")}</p>
                                    <p>Aantal personen: {r.numberOfGuests}</p>
                                    <p>Email: {r.emailAddress}</p>
                                    <textarea
                                        className="reservation-text-area"
                                        placeholder="Voeg een korte boodschap toe..."
                                        value={messageMap[r.id] || ""}
                                        onChange={e => setMessageMap(prev => ({...prev, [r.id]: e.target.value}))}
                                    />
                                    <div className="reservation-buttons-area">
                                        <button className="deny-button" disabled={loadingId === r.id}
                                                onClick={() => handleStatusUpdate(r.id, "DENIED", r.emailAddress, r.reservationDateTime)}>X
                                        </button>
                                        <button className="approve-button" disabled={loadingId === r.id}
                                                onClick={() => handleStatusUpdate(r.id, "APPROVED", r.emailAddress, r.reservationDateTime)}>✓
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </section>
                    )}
                </div>
                <div className="vertical-separator"/>
                <div className="reservation-right-side">
                    <h2>Bevestigde reserveringen:</h2>
                    {Object.keys(approvedByDate).map(date => (
                        <div key={date}>
                            <h3>{date}</h3>
                            <section className="reservation-card-container">
                                {approvedByDate[date].map(r => (
                                    <article key={r.id} className="reservation-card">
                                        <p>Naam: {r.lastName}, {r.firstName}</p>
                                        <p>Tijd: {new Date(r.reservationDateTime).toLocaleTimeString("nl-NL")}</p>
                                        <p>Aantal personen: {r.numberOfGuests}</p>
                                        <p>Email: {r.emailAddress}</p>
                                    </article>
                                ))}
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutHelper>
    );
}

export default AdminReservations;