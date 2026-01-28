package nl.novi.webshop.dtos.product;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public class ProductRequestDTO {
    @NotBlank
    @Size(min = 2, max = 30, message = "Naam mag niet leeg zijn")
    private String name;
    @Size(max = 255, message = "Beschrijving mag niet langer zijn dan 255 tekens")
    private String shortDescription;
    @NotNull
    @Positive
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

    public void setDescription(String description) {
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
        ProductRequestDTO that = (ProductRequestDTO) o;
        return Objects.equals(getName(), that.getName()) && Objects.equals(getShortDescription(), that.getShortDescription());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getShortDescription());
    }
}
