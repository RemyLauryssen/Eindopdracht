package nl.novi.webshop.services;

import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsRequestDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsResponseDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationStatusUpdateDTO;
import nl.novi.webshop.entities.ReservationDetailsEntity;
import nl.novi.webshop.entities.ReservationStatus;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.mappers.ReservationDetailsDTOMapper;
import nl.novi.webshop.repositories.ReservationDetailsRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReservationDetailsServiceTest {

    @Mock
    ReservationDetailsRepository reservationDetailsRepository;

    @Mock
    ReservationDetailsDTOMapper reservationDetailsDTOMapper;

    @InjectMocks
    ReservationDetailsService reservationDetailsService;

    @Test
    void findAllReservationDetails() {
        ReservationDetailsEntity entity = new ReservationDetailsEntity();
        ReservationDetailsResponseDTO dto = new ReservationDetailsResponseDTO();

        when(reservationDetailsRepository.findAll()).thenReturn(List.of(entity));
        when(reservationDetailsDTOMapper.mapToDTO(List.of(entity))).thenReturn(List.of(dto));

        List<ReservationDetailsResponseDTO> result =
                reservationDetailsService.findAllReservationDetails();

        assertEquals(1, result.size());
        verify(reservationDetailsRepository).findAll();
        verify(reservationDetailsDTOMapper).mapToDTO(List.of(entity));
    }

    @Test
    void findReservationDetailsById() {
        ReservationDetailsEntity entity = new ReservationDetailsEntity();
        ReservationDetailsResponseDTO dto = new ReservationDetailsResponseDTO();

        when(reservationDetailsRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(entity));
        when(reservationDetailsDTOMapper.mapToDTO(entity)).thenReturn(dto);

        ReservationDetailsResponseDTO result =
                reservationDetailsService.findReservationDetailsById(Long.valueOf(1));

        assertNotNull(result);
        verify(reservationDetailsRepository).findById(Long.valueOf(1));
        verify(reservationDetailsDTOMapper).mapToDTO(entity);
    }

    @Test
    void findReservationDetailsById_notFound() {
        when(reservationDetailsRepository.findById(Long.valueOf(1))).thenReturn(Optional.empty());

        assertThrows(RecordNotFoundException.class, () ->
                reservationDetailsService.findReservationDetailsById(Long.valueOf(1)));
    }

    @Test
    void createReservationDetails() {
        ReservationDetailsRequestDTO requestDTO = new ReservationDetailsRequestDTO();
        ReservationDetailsEntity entity = new ReservationDetailsEntity();
        ReservationDetailsResponseDTO responseDTO = new ReservationDetailsResponseDTO();

        when(reservationDetailsDTOMapper.mapToEntity(requestDTO)).thenReturn(entity);
        when(reservationDetailsRepository.save(entity)).thenReturn(entity);
        when(reservationDetailsDTOMapper.mapToDTO(entity)).thenReturn(responseDTO);

        ReservationDetailsResponseDTO result =
                reservationDetailsService.createReservationDetails(requestDTO);

        assertNotNull(result);
        verify(reservationDetailsRepository).save(entity);
    }

    @Test
    void updateReservationStatus() {
        ReservationDetailsEntity entity = new ReservationDetailsEntity();
        entity.setStatus(ReservationStatus.PENDING);

        ReservationStatusUpdateDTO statusUpdateDTO = new ReservationStatusUpdateDTO();
        statusUpdateDTO.setStatus("approved");

        ReservationDetailsResponseDTO responseDTO = new ReservationDetailsResponseDTO();

        when(reservationDetailsRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(entity));
        when(reservationDetailsRepository.save(entity)).thenReturn(entity);
        when(reservationDetailsDTOMapper.mapToDTO(entity)).thenReturn(responseDTO);

        ReservationDetailsResponseDTO result =
                reservationDetailsService.updateReservationStatus(Long.valueOf(1), statusUpdateDTO);

        assertEquals(ReservationStatus.APPROVED, entity.getStatus());
        verify(reservationDetailsRepository).save(entity);
    }

    @Test
    void updateReservationDetails() {
        ReservationDetailsEntity entity = new ReservationDetailsEntity();
        ReservationDetailsRequestDTO requestDTO = new ReservationDetailsRequestDTO();
        requestDTO.setFirstName("Jan");
        requestDTO.setLastName("Janssen");
        requestDTO.setEmailAddress("janjanssen@bestaatyahoonog.net");
        requestDTO.setNumberOfGuests(4);
        requestDTO.setReservationDateTime(LocalDateTime.now());

        ReservationDetailsResponseDTO responseDTO = new ReservationDetailsResponseDTO();

        when(reservationDetailsRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(entity));
        when(reservationDetailsRepository.save(entity)).thenReturn(entity);
        when(reservationDetailsDTOMapper.mapToDTO(entity)).thenReturn(responseDTO);

        ReservationDetailsResponseDTO result =
                reservationDetailsService.updateReservationDetails(Long.valueOf(1), requestDTO);

        assertEquals("Jan", entity.getFirstName());
        assertEquals("Janssen", entity.getLastName());
        assertEquals("janjanssen@bestaatyahoonog.net", entity.getEmailAddress());
        assertEquals(4, entity.getNumberOfGuests());

        verify(reservationDetailsRepository).save(entity);
    }

    @Test
    void deleteReservationDetails() {
        reservationDetailsService.deleteReservationDetails(Long.valueOf(1));

        verify(reservationDetailsRepository).deleteById(Long.valueOf(1));
    }

    @Test
    void updateReservationStatus_invalidStatus_throwsException() {
        ReservationDetailsEntity entity = new ReservationDetailsEntity();

        ReservationStatusUpdateDTO statusUpdateDTO = new ReservationStatusUpdateDTO();
        statusUpdateDTO.setStatus("not-a-valid-status");

        when(reservationDetailsRepository.findById(Long.valueOf(1))).thenReturn(Optional.of(entity));

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> reservationDetailsService.updateReservationStatus(Long.valueOf(1), statusUpdateDTO)
        );

        assertEquals(
                "Invalid reservation status: not-a-valid-status",
                exception.getMessage()
        );

        verify(reservationDetailsRepository, never()).save(any());
    }
}
