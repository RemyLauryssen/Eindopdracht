package nl.novi.webshop.repositories;

import nl.novi.webshop.entities.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileUploadRepository extends JpaRepository<ProductImage, String> {
    Optional<ProductImage> findByFileName(String fileName);
}
