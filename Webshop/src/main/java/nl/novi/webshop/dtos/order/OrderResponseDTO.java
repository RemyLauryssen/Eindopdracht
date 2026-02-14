package nl.novi.webshop.dtos.order;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDTO {

    private Long orderId;
    private LocalDateTime dateCreated;
    private LocalDateTime dateEdited;

    private String customerName;
    private String customerEmail;
    private List<OrderItemResponse> items;
    private Double totalPrice;

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }


    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private int quantity;
        private double price;

        public OrderItemResponse() {}

        public OrderItemResponse(Long productId, String productName,
                                 int quantity, double price) {
            this.productId = productId;
            this.productName = productName;
            this.quantity = quantity;
            this.price = price;
        }

        // getters & setters
        public Long getProductId() { return productId; }
        public void setProductId(Long productId) { this.productId = productId; }
        public String getProductName() { return productName; }
        public void setProductName(String productName) { this.productName = productName; }
        public int getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }
        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
    }

    // getters & setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public LocalDateTime getDateCreated() { return dateCreated; }
    public void setDateCreated(LocalDateTime dateCreated) { this.dateCreated = dateCreated; }
    public LocalDateTime getDateEdited() { return dateEdited; }
    public void setDateEdited(LocalDateTime dateEdited) { this.dateEdited = dateEdited; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public List<OrderItemResponse> getItems() { return items; }
    public void setItems(List<OrderItemResponse> items) { this.items = items; }
}