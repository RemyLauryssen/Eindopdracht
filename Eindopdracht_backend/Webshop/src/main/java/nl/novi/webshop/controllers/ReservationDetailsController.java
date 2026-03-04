package nl.novi.webshop.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsResponseDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsRequestDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationStatusUpdateDTO;
import nl.novi.webshop.helpers.UrlHelper;
import nl.novi.webshop.services.ReservationDetailsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation-details")
public class ReservationDetailsController {
    private final ReservationDetailsService reservationDetailsService;
    private final UrlHelper urlHelper;

    public ReservationDetailsController(ReservationDetailsService reservationDetailsService, UrlHelper urlHelper) {
        this.reservationDetailsService = reservationDetailsService;
        this.urlHelper = urlHelper;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReservationDetailsResponseDTO>> getReservationDetails() {
        List<ReservationDetailsResponseDTO> reservationDetails = reservationDetailsService.findAllReservationDetails();
        return ResponseEntity.ok(reservationDetails);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservationDetailsResponseDTO> getReservationDetailsById(@PathVariable Long id) throws EntityNotFoundException {
        ReservationDetailsResponseDTO reservationDetails = reservationDetailsService.findReservationDetailsById(id);
        return ResponseEntity.ok(reservationDetails);
    }

    @PostMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<ReservationDetailsResponseDTO> createReservationDetails(@RequestBody @Valid ReservationDetailsRequestDTO reservationDetailsModel) {
        ReservationDetailsResponseDTO newReservationDetails = reservationDetailsService.createReservationDetails(reservationDetailsModel);
        return ResponseEntity.created(urlHelper.getCurrentUrlWithId(newReservationDetails.getId())).body(newReservationDetails);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservationDetailsResponseDTO> updateReservationDetails(@PathVariable Long id, @RequestBody ReservationDetailsRequestDTO reservationDetailsModel) {
        ReservationDetailsResponseDTO updatedReservationDetails = reservationDetailsService.updateReservationDetails(id, reservationDetailsModel);
        return ResponseEntity.ok(updatedReservationDetails);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ReservationDetailsResponseDTO> updateReservationStatus(@PathVariable Long id, @RequestBody @Valid ReservationStatusUpdateDTO statusUpdateDTO) {
        ReservationDetailsResponseDTO updatedReservation = reservationDetailsService.updateReservationStatus(id, statusUpdateDTO);
        return ResponseEntity.ok(updatedReservation);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteReservationDetails(@PathVariable Long id) {
        reservationDetailsService.deleteReservationDetails(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}