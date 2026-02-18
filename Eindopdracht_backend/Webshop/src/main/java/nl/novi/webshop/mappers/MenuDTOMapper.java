package nl.novi.webshop.mappers;

import nl.novi.webshop.dtos.menu.MenuRequestDTO;
import nl.novi.webshop.dtos.menu.MenuResponseDTO;
import nl.novi.webshop.entities.MenuEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MenuDTOMapper implements DTOMapper<MenuResponseDTO, MenuRequestDTO, MenuEntity> {

    @Override
    public MenuResponseDTO mapToDTO(MenuEntity model) {

        var result = new MenuResponseDTO();
        result.setId(model.getId());
        result.setDescription(model.getDescription());
        result.setPrice(model.getPrice());
        result.setName(model.getName());
        result.setDish(model.getDish());

        return result;
    }


    @Override
    public List<MenuResponseDTO> mapToDTO(List<MenuEntity> models) {
        var result = new ArrayList<MenuResponseDTO>();
        for (MenuEntity model : models) {
            result.add(mapToDTO(model));
        }
        return result;
    }


    @Override
    public MenuEntity mapToEntity(MenuRequestDTO menuModel) {
        var result = new MenuEntity();
        result.setName(menuModel.getName());
        result.setDescription(menuModel.getDescription());
        result.setPrice(menuModel.getPrice());
        result.setDish(menuModel.getDish());
        return result;
    }
}
