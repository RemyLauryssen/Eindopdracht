package nl.novi.webshop.mappers;

import nl.novi.webshop.dtos.order.OrderResponseDTO;
import nl.novi.webshop.entities.OrderEntity;
import nl.novi.webshop.entities.OrderItem;
import org.springframework.stereotype.Component;


@Component
public class OrderDTOMapper {

    public OrderResponseDTO mapToDTO(OrderEntity order) {

        OrderResponseDTO dto = new OrderResponseDTO();

        dto.setOrderId(order.getId());
        dto.setDateCreated(order.getDateCreated());
        dto.setDateEdited(order.getDateEdited());
        dto.setCustomerName(order.getCustomerName());
        dto.setCustomerEmail(order.getCustomerEmail());
        dto.setTotalPrice(order.getTotalPrice());

        if (order.getPaymentDetails() != null) {
            dto.setPaymentMethod(order.getPaymentDetails().getPaymentMethod());
            dto.setTransactionId(order.getPaymentDetails().getTransactionId());
            dto.setPaymentAmount(order.getPaymentDetails().getAmount());
        }

        dto.setItems(
                order.getItems().stream()
                        .map(this::mapItemToDTO)
                        .toList()
        );

        return dto;
    }


    private OrderResponseDTO.OrderItemResponse mapItemToDTO(OrderItem item) {

        OrderResponseDTO.OrderItemResponse dto =
                new OrderResponseDTO.OrderItemResponse();

        dto.setProductId(item.getProduct().getId());
        dto.setProductName(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getProduct().getPrice());
        dto.setPrice(item.getPrice());

        return dto;
    }
}

