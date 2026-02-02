package nl.novi.webshop.repositories;

import nl.novi.webshop.entities.MenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MenuRepository extends JpaRepository<MenuEntity, Long> {
    Optional<Object> findByDish(String dish);
}
