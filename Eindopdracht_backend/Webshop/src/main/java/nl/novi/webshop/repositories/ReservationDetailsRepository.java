package nl.novi.webshop.repositories;

import nl.novi.webshop.entities.ReservationDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReservationDetailsRepository extends JpaRepository<ReservationDetailsEntity, Long> {

}
