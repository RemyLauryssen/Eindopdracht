package nl.novi.webshop.services;

import jakarta.transaction.Transactional;
import nl.novi.webshop.dtos.order.OrderRequestDTO;
import nl.novi.webshop.dtos.order.OrderResponseDTO;
import nl.novi.webshop.entities.OrderEntity;
import nl.novi.webshop.entities.OrderItem;
import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.repositories.OrderRepository;
import nl.novi.webshop.repositories.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }
    public OrderResponseDTO mapToResponse(OrderEntity order) {
        List<OrderResponseDTO.OrderItemResponse> itemResponses =
                order.getItems().stream()
                        .map(item -> new OrderResponseDTO.OrderItemResponse(
                                item.getProduct().getId(),
                                item.getProduct().getName(),
                                item.getQuantity(),
                                item.getPrice()
                        ))
                        .toList();

        return new OrderResponseDTO(
                order.getId(),
                order.getCreatedAt(),
                order.getCustomerName(),
                order.getCustomerEmail(),
                itemResponses
        );
    }

    @Transactional
    public OrderEntity createOrder(OrderRequestDTO request) {

        OrderEntity order = new OrderEntity();
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());

        double total = 0.0;

        for (OrderRequestDTO.OrderItemRequestDTO itemDTO : request.getItems()) {

            if (itemDTO.getQuantity() <= 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Quantity must be at least 1"
                );
            }

            ProductEntity product = productRepository
                    .findById(itemDTO.getProductId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Product " + itemDTO.getProductId() + " not found"
                    ));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDTO.getQuantity());

            double itemTotal = product.getPrice() * itemDTO.getQuantity();
            orderItem.setPrice(itemTotal);

            order.addItem(orderItem);
            total += itemTotal;
        }

        order.setTotalPrice(total);
        return orderRepository.save(order);
    }
}