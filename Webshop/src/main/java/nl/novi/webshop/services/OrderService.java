package nl.novi.webshop.services;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import nl.novi.webshop.dtos.order.OrderRequestDTO;
import nl.novi.webshop.dtos.order.OrderResponseDTO;
import nl.novi.webshop.entities.OrderEntity;
import nl.novi.webshop.entities.OrderItem;
import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.mappers.OrderDTOMapper;
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
    private final OrderDTOMapper orderDTOMapper;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository, OrderDTOMapper orderDTOMapper) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderDTOMapper = orderDTOMapper;
    }

    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(orderDTOMapper::mapToDTO)
                .toList();
    }


    public OrderResponseDTO findOrderById(Long id) {
    OrderEntity order = getOrderEntity(id);
    return orderDTOMapper.mapToDTO(order);
    }



    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO dto) {

        OrderEntity order = new OrderEntity();
        order.setCustomerName(dto.getCustomerName());
        order.setCustomerEmail(dto.getCustomerEmail());

        double total = 0;

        for (OrderRequestDTO.OrderItemRequestDTO itemDto : dto.getItems()) {
            ProductEntity product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found"));

            OrderItem item = new OrderItem();
            item.setProduct(product);
            item.setQuantity(itemDto.getQuantity());
            item.setPrice(product.getPrice() * itemDto.getQuantity());

            total += item.getPrice();
            order.addItem(item);
        }

        order.setTotalPrice(total);

        OrderEntity saved = orderRepository.save(order);
        return orderDTOMapper.mapToDTO(saved);
    }

    private OrderEntity getOrderEntity(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Order not found with id " + id)
                );
    }

    public List<OrderResponseDTO> findOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmail(email)
                .stream()
                .map(orderDTOMapper::mapToDTO)
                .toList();
    }
}