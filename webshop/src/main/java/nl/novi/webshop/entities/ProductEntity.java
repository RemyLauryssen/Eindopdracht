package nl.novi.webshop.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class ProductEntity extends BaseEntity {
    private String name;

    private String shortDescription;

    private double price;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
