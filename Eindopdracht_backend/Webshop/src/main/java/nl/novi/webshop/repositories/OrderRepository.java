package nl.novi.webshop.repositories;

import nl.novi.webshop.entities.OrderEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    @EntityGraph(attributePaths = {"items", "items.product"})
    Optional<OrderEntity> findById(Long id);

    List<OrderEntity> findByCustomerEmail(String email);
}