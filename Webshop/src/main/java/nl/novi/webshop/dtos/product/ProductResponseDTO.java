package nl.novi.webshop.dtos.product;

import java.util.Objects;

public class ProductResponseDTO {
    private Long id;
    private String name;
    private String shortDescription;
    private double price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        ProductResponseDTO that = (ProductResponseDTO) o;
        return Objects.equals(getName(), that.getName()) && Objects.equals(getShortDescription(), that.getShortDescription());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getShortDescription());
    }
}
