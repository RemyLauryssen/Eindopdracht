package nl.novi.webshop.dtos.product;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class ProductRequestDTO {

    @NotNull(message = "Naam mag niet leeg zijn")
    @Size(min = 2, max = 100, message = "Naam moet tussen de 2 en 100 tekens lang zijn")
    private String name;

    @Max(value = 255, message = "Beschrijving mag niet langer zijn dan 255 tekens")
    private String shortDescription;

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

}
