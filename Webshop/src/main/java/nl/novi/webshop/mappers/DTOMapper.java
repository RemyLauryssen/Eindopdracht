package nl.novi.webshop.mappers;

import nl.novi.webshop.entities.BaseEntity;

import java.util.List;

public interface DTOMapper<RESPONSE, REQUEST , ENTITY extends BaseEntity> {
    RESPONSE mapToDTO(ENTITY model);

    List<RESPONSE> mapToDTO(List<ENTITY> models);

    ENTITY mapToEntity(REQUEST productModel);
}
