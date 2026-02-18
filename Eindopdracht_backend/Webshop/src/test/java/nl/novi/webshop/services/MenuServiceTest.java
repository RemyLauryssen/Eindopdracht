package nl.novi.webshop.services;

import nl.novi.webshop.dtos.menu.MenuRequestDTO;
import nl.novi.webshop.dtos.menu.MenuResponseDTO;
import nl.novi.webshop.entities.MenuEntity;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.mappers.MenuDTOMapper;
import nl.novi.webshop.repositories.MenuRepository;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MenuServiceTest {

    @Mock
    MenuRepository menuRepository;

    @InjectMocks
    MenuService menuService;

    @Mock
    MenuDTOMapper menuDTOMapper;

    private MenuEntity menuEntity() {
        MenuEntity entity = new MenuEntity();
        entity.setId(Long.valueOf(1));
        entity.setName("Broodje tonijnsalade");
        entity.setDescription("Een lekker broodje tonijnsalade");
        entity.setPrice(Double.valueOf(3.5));
        entity.setDish("lunch");
        return entity;
    }

    private MenuRequestDTO menuRequestDTO() {
        MenuRequestDTO dto = new MenuRequestDTO();
        dto.setName("Broodje tonijnsalde");
        dto.setDescription("Een lekker broodje tonijnsalade");
        dto.setPrice(Double.valueOf(3.5));
        dto.setDish("lunch");
        return dto;
    }

    private MenuResponseDTO menuResponseDTO() {
        MenuResponseDTO dto = new MenuResponseDTO();
        dto.setId(Long.valueOf(1L));
        dto.setName("Broodje tonijnsalade");
        dto.setDescription("Een lekker broodje tonijnsalade");
        dto.setPrice(Double.valueOf(3.5));
        dto.setDish("lunch");
        return dto;
    }


    @Test
    void findAllMenuItems() {
        List<MenuEntity> entities = List.of(menuEntity());
        List<MenuResponseDTO> response = List.of(menuResponseDTO());

        when(menuRepository.findAll()).thenReturn(entities);
        when(menuDTOMapper.mapToDTO(entities)).thenReturn(response);

        List<MenuResponseDTO> result = menuService.findAllMenuItems();

        assertEquals(1, result.size());
        verify(menuRepository).findAll();
        verify(menuDTOMapper).mapToDTO(entities);
    }

    @Test
    void findMenuItemById() {
        MenuEntity entity = menuEntity();
        MenuResponseDTO responseDTO = menuResponseDTO();

        when(menuRepository.findById(Long.valueOf(1L))).thenReturn(Optional.of(entity));
        when(menuDTOMapper.mapToDTO(entity)).thenReturn(responseDTO);

        MenuResponseDTO result = menuService.findMenuItemById(Long.valueOf(1L));

        assertEquals("Broodje tonijnsalade", result.getName());
        verify(menuRepository).findById(Long.valueOf(1L));
    }

    @Test
    void findMenuItemById_notFound() {
        when(menuRepository.findById(Long.valueOf(1L))).thenReturn(Optional.empty());

        assertThrows(
                RecordNotFoundException.class,
                () -> menuService.findMenuItemById(Long.valueOf(1L))
        );
    }

    @Test
    void createMenuItem() {
        MenuRequestDTO requestDTO = menuRequestDTO();
        MenuEntity entity = menuEntity();
        MenuResponseDTO responseDTO = menuResponseDTO();

        when(menuDTOMapper.mapToEntity(requestDTO)).thenReturn(entity);
        when(menuRepository.save(entity)).thenReturn(entity);
        when(menuDTOMapper.mapToDTO(entity)).thenReturn(responseDTO);

        MenuResponseDTO result = menuService.createMenuItem(requestDTO);

        assertEquals("Broodje tonijnsalade", result.getName());
        verify(menuRepository).save(entity);
    }

    @Test
    void updateMenuItem() {
        MenuRequestDTO requestDTO = menuRequestDTO();
        MenuEntity entity = menuEntity();
        MenuResponseDTO responseDTO = menuResponseDTO();

        when(menuRepository.findById(Long.valueOf(1L))).thenReturn(Optional.of(entity));
        when(menuRepository.save(entity)).thenReturn(entity);
        when(menuDTOMapper.mapToDTO(entity)).thenReturn(responseDTO);

        MenuResponseDTO result = menuService.updateMenuItem(Long.valueOf(1L), requestDTO);

        assertEquals("Broodje tonijnsalade", result.getName());
        verify(menuRepository).save(entity);
    }

    @Test
    void deleteMenuItem() {
        menuService.deleteMenuItem(Long.valueOf(1L));

        verify(menuRepository).deleteById(Long.valueOf(1L));
    }
}