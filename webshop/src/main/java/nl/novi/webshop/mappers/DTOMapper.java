package nl.novi.webshop.mappers;

import nl.novi.webshop.entities.BaseEntity;

import java.util.List;

public interface DTOMapper<RESPONSE, REQUEST, T extends BaseEntity> {
    RESPONSE mapToDTO(T model);
    List<RESPONSE> mapToDTO(List<T> models);
    T mapToEntity(REQUEST productModel);
}
