package nl.novi.webshop.dtos.product;

import jakarta.persistence.Column;

public class ProductResponseDTO {

    private long id;
    private String name;
    private String shortDescription;
    private double price;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
                return name;
    }

    public void setName(String name) {this.name = name;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = this.shortDescription;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = this.price;
    }

}
