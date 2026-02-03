package nl.novi.webshop.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ProductImage {

    @Id
    private String fileName;

    public ProductImage(String fileName) {
        this.fileName = fileName;
    }

    public ProductImage() {
    }

    public String getFileName() {
        return fileName;
    }
}
