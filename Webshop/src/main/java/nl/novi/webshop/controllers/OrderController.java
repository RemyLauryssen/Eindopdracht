package nl.novi.webshop.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import nl.novi.webshop.dtos.order.OrderRequestDTO;
import nl.novi.webshop.dtos.order.OrderResponseDTO;
import nl.novi.webshop.entities.OrderEntity;
import nl.novi.webshop.services.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        List<OrderResponseDTO> orders = orderService.getAllOrders();

        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    @PreAuthorize("""
    hasAuthority('ADMIN') || (hasAuthority('USER') and @orderSecurity.isOwner(#id, authentication))
""")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) throws EntityNotFoundException {
        OrderResponseDTO order = orderService.findOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/user")
    @PreAuthorize("hasAuthority('ADMIN') || hasAuthority('USER')")
    public ResponseEntity<List<OrderResponseDTO>> getOrdersForUser(
            @RequestParam(required = false) String email,
            Authentication authentication) {

        String userEmail;

        // If the caller is ADMIN, allow optional email param
        if (authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
            userEmail = (email != null) ? email : getEmailFromAuth(authentication);
        } else {
            // USER can only see their own orders
            userEmail = getEmailFromAuth(authentication);
        }

        List<OrderResponseDTO> orders = orderService.findOrdersByCustomerEmail(userEmail);
        return ResponseEntity.ok(orders);
    }

    // Helper method to extract email from authentication
    private String getEmailFromAuth(Authentication authentication) {
        // Assuming your JWT gives the email as the principal or in details
        if (authentication.getPrincipal() instanceof org.springframework.security.oauth2.jwt.Jwt jwt) {
            return jwt.getClaim("email");
        }
        return authentication.getName(); // fallback
    }


    @PostMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
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
