package nl.novi.webshop.controllers;

import org.springframework.core.io.Resource;
import jakarta.persistence.EntityNotFoundException;
import nl.novi.webshop.dtos.product.ProductResponseDTO;
import nl.novi.webshop.dtos.product.ProductRequestDTO;
import nl.novi.webshop.services.ImageService;
import nl.novi.webshop.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ImageService imageService;

    public ProductController(ProductService productService, ImageService imageService) {
        this.productService = productService;
        this.imageService = imageService;
    }


    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/{id}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findProductById(id));
    }


    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductResponseDTO> createProductWithImage(
            @RequestParam("name") String name,
            @RequestParam("shortDescription") String shortDescription,
            @RequestParam("price") Double price,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {

        ProductRequestDTO requestDTO = new ProductRequestDTO();
        requestDTO.setName(name);
        requestDTO.setShortDescription(shortDescription);
        requestDTO.setPrice(price);


        ProductResponseDTO created = productService.createProduct(requestDTO);


        if (file != null && !file.isEmpty()) {
            String storedFileName = imageService.storeProductImage(created.getId(), file);
            productService.attachImageToProduct(created.getId(), storedFileName);


            created = productService.findProductById(created.getId());
        }

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("products/{id}")
                .buildAndExpand(created.getId())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }


    @GetMapping("/{id}/image")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Resource> getProductImage(@PathVariable Long id) {

        Resource image = imageService.loadProductImage(id);

        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(image);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            imageService.deleteProductImage(id);
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
