package nl.novi.webshop.dtos.reservationDetails;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import nl.novi.webshop.entities.ReservationStatus;

import java.time.LocalDateTime;
import java.util.Objects;

public class ReservationDetailsRequestDTO {
    @NotBlank
    @Size(min = 2, max = 30, message = "Naam mag niet leeg zijn")
    private String firstName;
    @NotBlank
    @Size(min = 2, max = 30, message = "Achternaam moet tussen 2 en 30 tekens lang zijn")
    private String lastName;
    @NotNull
    private String emailAddress;
    @NotNull
    private LocalDateTime reservationDateTime;
    @NotNull
    @Positive
    private int numberOfGuests;

    private ReservationStatus status;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public LocalDateTime getReservationDateTime() {
        return reservationDateTime;
    }

    public void setReservationDateTime(LocalDateTime reservationDateTime) { this.reservationDateTime = reservationDateTime; }

    public int getNumberOfGuests() {
        return numberOfGuests;
    }

    public void setNumberOfGuests(int numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }

    public ReservationStatus getStatus() {
        return status;
    }

    public void setStatus(ReservationStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ReservationDetailsRequestDTO that = (ReservationDetailsRequestDTO) o;
        return Objects.equals(getFirstName(), that.getFirstName()) && Objects.equals(getLastName(), that.getLastName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getFirstName(), getLastName());
    }
}
