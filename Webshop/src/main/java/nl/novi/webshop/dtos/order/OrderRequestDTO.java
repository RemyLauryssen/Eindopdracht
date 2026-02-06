package nl.novi.webshop.dtos.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public class OrderRequestDTO {

    @NotBlank
    private String customerName;

    @Email
    @NotBlank
    private String customerEmail;

    @NotEmpty
    @Valid
    private List<OrderItemRequestDTO> items;
    public OrderRequestDTO(
            String customerName,
            String customerEmail,
            List<OrderItemRequestDTO> items
    ) {
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.items = items;
    }

    public static class OrderItemRequestDTO {

        @NotNull
        private Long productId;

        @Min(1)
        private int quantity;

        // getters / setters
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    // getters / setters
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public List<OrderItemRequestDTO> getItems() { return items; }
    public void setItems(List<OrderItemRequestDTO> items) { this.items = items; }
}
