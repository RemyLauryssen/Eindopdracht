package nl.novi.webshop.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import nl.novi.webshop.dtos.menu.MenuResponseDTO;
import nl.novi.webshop.dtos.menu.MenuRequestDTO;
import nl.novi.webshop.entities.MenuEntity;
import nl.novi.webshop.helpers.UrlHelper;
import nl.novi.webshop.services.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
public class MenuController {
    private final MenuService menuService;
    private final UrlHelper urlHelper;

    public MenuController(MenuService menuService, UrlHelper urlHelper) {
        this.menuService = menuService;
        this.urlHelper = urlHelper;
    }

    @GetMapping
    public ResponseEntity<List<MenuResponseDTO>> getMenuItems() {
        List<MenuResponseDTO> menuItems = menuService.findAllMenuItems();
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuResponseDTO> getMenuItemById(@PathVariable Long id) throws EntityNotFoundException {
        MenuResponseDTO menuItem = menuService.findMenuItemById(id);
        return ResponseEntity.ok(menuItem);
    }

    @GetMapping("/{dish}")
    public ResponseEntity<MenuResponseDTO> getMenuItemByDish(@PathVariable @RequestParam(name="mains") String dish) {
        MenuResponseDTO menuItem = menuService.findMenuItemByDish(dish);
        return ResponseEntity.ok(menuItem);
    }

     @PostMapping
    public ResponseEntity<MenuResponseDTO> createMenuItem(@RequestBody @Valid MenuRequestDTO menuModel) {
        MenuResponseDTO newMenuItem = menuService.createMenuItem(menuModel);
        return ResponseEntity.created(urlHelper.getCurrentUrlWithId(newMenuItem.getId())).body(newMenuItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MenuResponseDTO> updateMenuItem(@PathVariable Long id, @RequestBody MenuRequestDTO menuModel) {
        MenuResponseDTO updatedMenuItem = menuService.updateMenuItem(id, menuModel);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}