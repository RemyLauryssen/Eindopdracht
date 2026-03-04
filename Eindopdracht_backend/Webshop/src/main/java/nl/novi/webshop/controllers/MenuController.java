package nl.novi.webshop.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import nl.novi.webshop.dtos.menu.MenuResponseDTO;
import nl.novi.webshop.dtos.menu.MenuRequestDTO;
import nl.novi.webshop.helpers.UrlHelper;
import nl.novi.webshop.services.MenuService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<MenuResponseDTO>> getMenuItems() {
        List<MenuResponseDTO> menuItems = menuService.findAllMenuItems();
        return ResponseEntity.ok(menuItems);
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<MenuResponseDTO> getMenuItemById(@PathVariable Long id) throws EntityNotFoundException {
        MenuResponseDTO menuItem = menuService.findMenuItemById(id);
        return ResponseEntity.ok(menuItem);
    }

     @PostMapping
     @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuResponseDTO> createMenuItem(@RequestBody @Valid MenuRequestDTO menuModel) {
        MenuResponseDTO newMenuItem = menuService.createMenuItem(menuModel);
        return ResponseEntity.created(urlHelper.getCurrentUrlWithId(newMenuItem.getId())).body(newMenuItem);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MenuResponseDTO> updateMenuItem(@PathVariable Long id, @RequestBody MenuRequestDTO menuModel) {
        MenuResponseDTO updatedMenuItem = menuService.updateMenuItem(id, menuModel);
        return ResponseEntity.ok(updatedMenuItem);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}