package nl.novi.webshop.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private Double totalPrice;


    private String customerName;

    private String customerEmail;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    // Add an item to the order
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }

    // Getters and setters
    public Long getId() { return id; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public List<OrderItem> getItems() { return items; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
}