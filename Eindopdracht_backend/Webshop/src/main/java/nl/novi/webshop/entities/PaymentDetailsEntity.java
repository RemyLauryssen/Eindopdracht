package nl.novi.webshop.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "payment_details")
public class PaymentDetailsEntity extends BaseEntity {

    @Column(nullable = true)
    private String paymentMethod;

    @Column(nullable = true)
    private String transactionId;

    @Column(nullable = true)
    private Double amount;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = true, unique = true)
    private OrderEntity order;

    public String getPaymentMethod() {
        return paymentMethod;
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

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }
}
