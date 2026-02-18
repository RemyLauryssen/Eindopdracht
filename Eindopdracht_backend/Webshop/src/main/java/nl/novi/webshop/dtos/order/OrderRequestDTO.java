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

    private String paymentMethod;
    private String transactionId;

        public static class OrderItemRequestDTO {

        @NotNull
        private Long productId;

        @Min(1)
        private int quantity;

        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }

        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
    }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public List<OrderItemRequestDTO> getItems() { return items; }
    public void setItems(List<OrderItemRequestDTO> items) { this.items = items; }

    public String getPaymentMethod() {
            return  paymentMethod;
    }
    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getTransactionId() {
            return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
