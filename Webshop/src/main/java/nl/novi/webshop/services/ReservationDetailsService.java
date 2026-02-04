package nl.novi.webshop.services;


import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsRequestDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsResponseDTO;
import nl.novi.webshop.entities.ReservationDetailsEntity;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.mappers.ReservationDetailsDTOMapper;
import nl.novi.webshop.repositories.ReservationDetailsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationDetailsService {

    private final ReservationDetailsRepository reservationDetailsRepository;
    private final ReservationDetailsDTOMapper reservationDetailsDTOMapper;


    public ReservationDetailsService(ReservationDetailsRepository reservationDetailsRepository, ReservationDetailsDTOMapper reservationDetailsDTOMapper) {
        this.reservationDetailsRepository = reservationDetailsRepository;
        this.reservationDetailsDTOMapper = reservationDetailsDTOMapper;
    }

    public List<ReservationDetailsResponseDTO> findAllReservationDetails() {
        return reservationDetailsDTOMapper.mapToDTO(reservationDetailsRepository.findAll());
    }

    public ReservationDetailsResponseDTO findReservationDetailsById(Long id)  {
        ReservationDetailsEntity reservationDetailsEntity = getReservationDetailsEntity(id);
        return reservationDetailsDTOMapper.mapToDTO(reservationDetailsEntity);
    }

    public ReservationDetailsResponseDTO createReservationDetails(ReservationDetailsRequestDTO reservationDetailsRequestDTO) {
        ReservationDetailsEntity reservationDetailsEntity = reservationDetailsDTOMapper.mapToEntity(reservationDetailsRequestDTO);
        reservationDetailsEntity = reservationDetailsRepository.save(reservationDetailsEntity);
        return reservationDetailsDTOMapper.mapToDTO(reservationDetailsEntity);
    }

    public ReservationDetailsResponseDTO updateReservationDetails(Long id, ReservationDetailsRequestDTO requestDTO)  {
        ReservationDetailsEntity existingReservationDetailsEntity = getReservationDetailsEntity(id);

        existingReservationDetailsEntity.setFirstName(requestDTO.getFirstName());
        existingReservationDetailsEntity.setLastName(requestDTO.getLastName());
        existingReservationDetailsEntity.setEmailAddress(requestDTO.getEmailAddress());
        existingReservationDetailsEntity.setLocalDateTime(requestDTO.getLocalDateTime());

        existingReservationDetailsEntity = reservationDetailsRepository.save(existingReservationDetailsEntity);
        return reservationDetailsDTOMapper.mapToDTO(existingReservationDetailsEntity);
    }

    private ReservationDetailsEntity getReservationDetailsEntity(Long id) {
        return reservationDetailsRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Reservation detail " + id +" not found"));
    }



    public void deleteReservationDetails(Long id) {
        reservationDetailsRepository.deleteById(id);
    }

}
