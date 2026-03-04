package nl.novi.webshop.services;


import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsRequestDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsResponseDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationStatusUpdateDTO;
import nl.novi.webshop.entities.ReservationDetailsEntity;
import nl.novi.webshop.entities.ReservationStatus;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.mappers.ReservationDetailsDTOMapper;
import nl.novi.webshop.repositories.ReservationDetailsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public ReservationDetailsResponseDTO updateReservationStatus(Long id, ReservationStatusUpdateDTO reservationStatusUpdateDTO) {

        ReservationDetailsEntity reservationDetailsEntity = getReservationDetailsEntity(id);

        ReservationStatus status;
        try {
            status = ReservationStatus.valueOf(reservationStatusUpdateDTO.getStatus().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid reservation status: " + reservationStatusUpdateDTO.getStatus());
        }

        reservationDetailsEntity.setStatus(status);


        reservationDetailsEntity = reservationDetailsRepository.save(reservationDetailsEntity);
        return reservationDetailsDTOMapper.mapToDTO(reservationDetailsEntity);
    }

    public ReservationDetailsResponseDTO updateReservationDetails(Long id, ReservationDetailsRequestDTO requestDTO)  {
        ReservationDetailsEntity existingReservationDetailsEntity = getReservationDetailsEntity(id);


        existingReservationDetailsEntity.setFirstName(requestDTO.getFirstName());
        existingReservationDetailsEntity.setLastName(requestDTO.getLastName());
        existingReservationDetailsEntity.setEmailAddress(requestDTO.getEmailAddress());
        existingReservationDetailsEntity.setReservationDateTime(requestDTO.getReservationDateTime());
        existingReservationDetailsEntity.setNumberOfGuests(requestDTO.getNumberOfGuests());


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
