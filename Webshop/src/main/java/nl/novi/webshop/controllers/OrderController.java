package nl.novi.webshop.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import nl.novi.webshop.dtos.order.OrderRequestDTO;
import nl.novi.webshop.dtos.order.OrderResponseDTO;
import nl.novi.webshop.entities.OrderEntity;
import nl.novi.webshop.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        List<OrderResponseDTO> orders = orderService.getAllOrders();

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) throws EntityNotFoundException {
        OrderResponseDTO order = orderService.findOrderById(id);
        return ResponseEntity.ok(order);
    }


    @PostMapping
    public ResponseEntity<OrderResponseDTO> createOrder(
            @Valid @RequestBody OrderRequestDTO request
    ) {
        OrderEntity created = orderService.createOrder(request);

        OrderResponseDTO response = orderService.mapToResponse(created);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
