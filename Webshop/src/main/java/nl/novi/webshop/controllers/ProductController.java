package nl.novi.webshop.controllers;

import org.springframework.core.io.Resource;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import nl.novi.webshop.dtos.product.ProductResponseDTO;
import nl.novi.webshop.dtos.product.ProductRequestDTO;
import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.helpers.UrlHelper;
import nl.novi.webshop.services.ImageService;
import nl.novi.webshop.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ImageService imageService;

    public ProductController(ProductService productService, ImageService imageService) {
        this.productService = productService;
        this.imageService = imageService;
    }

    // -------------------- PRODUCTS --------------------

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findProductById(id));
    }

    // -------------------- CREATE WITH IMAGE --------------------
    @PostMapping(
            value = "/create-with-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ProductResponseDTO> createProductWithImage(
            @RequestParam("name") String name,
            @RequestParam("shortDescription") String shortDescription,
            @RequestParam("price") Double price,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        // Create product
        ProductRequestDTO requestDTO = new ProductRequestDTO();
        requestDTO.setName(name);
        requestDTO.setShortDescription(shortDescription);
        requestDTO.setPrice(price);

        ProductResponseDTO created = productService.createProduct(requestDTO);

        // Attach image if provided
        if (file != null && !file.isEmpty()) {
            String storedFileName = imageService.storeProductImage(file);
            productService.attachImageToProduct(created.getId(), storedFileName);
        }

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("products/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    // -------------------- GET IMAGE --------------------
    @GetMapping("/{id}/image")
    public ResponseEntity<Resource> getProductImage(@PathVariable Long id) {
        String fileName = productService.getImageNameByProductId(id);
        Resource image = imageService.loadProductImage(fileName);

        MediaType mediaType = MediaType.IMAGE_JPEG;


        return ResponseEntity.ok()
                .contentType(mediaType)
                .body(image);
    }
}
