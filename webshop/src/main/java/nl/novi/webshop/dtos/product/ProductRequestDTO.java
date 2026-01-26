package nl.novi.webshop.dtos.product;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;


public class ProductRequestDTO {

    @NotNull(message = "Naam mag niet leeg zijn")
    @Size(min = 2, max = 30, message = "Naam moet tussen de 2 en 30 tekens lang zijn")
    private String name;

    @Max(value = 255, message = "Beschrijving mag niet langer zijn dan 255 tekens")
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

