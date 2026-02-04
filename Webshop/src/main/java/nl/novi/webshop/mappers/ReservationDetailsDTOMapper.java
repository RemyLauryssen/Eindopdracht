package nl.novi.webshop.mappers;

import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsRequestDTO;
import nl.novi.webshop.dtos.reservationDetails.ReservationDetailsResponseDTO;
import nl.novi.webshop.entities.ReservationDetailsEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ReservationDetailsDTOMapper implements DTOMapper<ReservationDetailsResponseDTO, ReservationDetailsRequestDTO, ReservationDetailsEntity> {

    @Override
    public ReservationDetailsResponseDTO mapToDTO(ReservationDetailsEntity model) {

        var result = new ReservationDetailsResponseDTO();
        result.setId(model.getId());
        result.setFirstName(model.getFirstName());
        result.setLastName(model.getLastName());
        result.setEmailAddress(model.getEmailAddress());
        result.setLocalDateTime(model.getLocalDateTime());

        return result;
    }


    @Override
    public List<ReservationDetailsResponseDTO> mapToDTO(List<ReservationDetailsEntity> models) {
        var result = new ArrayList<ReservationDetailsResponseDTO>();
        for (ReservationDetailsEntity model : models) {
            result.add(mapToDTO(model));
        }
        return result;
    }


    @Override
    public ReservationDetailsEntity mapToEntity(ReservationDetailsRequestDTO reservationModel) {
        var result = new ReservationDetailsEntity();
        result.setFirstName(reservationModel.getFirstName());
        result.setLastName(reservationModel.getLastName());
        result.setEmailAddress(reservationModel.getEmailAddress());
        result.setLocalDateTime(reservationModel.getLocalDateTime());
        return result;
    }
}
