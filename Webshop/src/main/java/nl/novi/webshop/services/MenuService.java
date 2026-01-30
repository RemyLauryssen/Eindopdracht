package nl.novi.webshop.services;


import nl.novi.webshop.dtos.menu.MenuRequestDTO;
import nl.novi.webshop.dtos.menu.MenuResponseDTO;
import nl.novi.webshop.entities.MenuEntity;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.mappers.MenuDTOMapper;
import nl.novi.webshop.repositories.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    private final MenuRepository menuRepository;
    private final MenuDTOMapper menuDTOMapper;


    public MenuService(MenuRepository menuRepository, MenuDTOMapper menuDTOMapper) {
        this.menuRepository = menuRepository;
        this.menuDTOMapper = menuDTOMapper;
    }

    public List<MenuResponseDTO> findAllMenuItems() {
        return menuDTOMapper.mapToDTO(menuRepository.findAll());
    }

    public MenuResponseDTO findMenuItemById(Long id)  {
        MenuEntity menuEntity = getMenuEntity(id);
        return menuDTOMapper.mapToDTO(menuEntity);
    }

    public MenuResponseDTO createMenuItem(MenuRequestDTO menuDTO) {
        MenuEntity menuEntity = menuDTOMapper.mapToEntity(menuDTO);
        menuEntity = menuRepository.save(menuEntity);
        return menuDTOMapper.mapToDTO(menuEntity);
    }

    public MenuResponseDTO updateMenuItem(Long id, MenuRequestDTO requestDTO)  {
        MenuEntity existingMenuEntity = getMenuEntity(id);

        existingMenuEntity.setName(requestDTO.getName());
        existingMenuEntity.setDescription(requestDTO.getDescription());
        existingMenuEntity.setPrice(requestDTO.getPrice());
        existingMenuEntity.setType(requestDTO.getType());

        existingMenuEntity = menuRepository.save(existingMenuEntity);
        return menuDTOMapper.mapToDTO(existingMenuEntity);
    }

    private MenuEntity getMenuEntity(Long id) {
        MenuEntity existingMenuEntity = menuRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Menu-item " + id +" not found"));
        return existingMenuEntity;
    }

    public void deleteMenuItem(Long id) {
        menuRepository.deleteById(id);
    }

}
