package nl.novi.webshop.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import nl.novi.webshop.dtos.product.ProductResponseDTO;
import nl.novi.webshop.dtos.product.ProductRequestDTO;
import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.helpers.UrlHelper;
import nl.novi.webshop.services.ImageService;
import nl.novi.webshop.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final UrlHelper urlHelper;
    private final ImageService imageService;

    public ProductController(ProductService productService, UrlHelper urlHelper, ImageService imageService) {
        this.productService = productService;
        this.urlHelper = urlHelper;
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        List<ProductResponseDTO> products = productService.findAllProducts();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) throws EntityNotFoundException {
        ProductResponseDTO product = productService.findProductById(id);
        return ResponseEntity.ok(product);
    }

    @PostMapping
    public ResponseEntity<ProductResponseDTO> createProduct(@RequestBody @Valid ProductRequestDTO productModel) {
        ProductResponseDTO newProduct = productService.createProduct(productModel);
        return ResponseEntity.created(urlHelper.getCurrentUrlWithId(newProduct.getId())).body(newProduct);
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<ProductEntity> addImageToProduct(@PathVariable Long id,
                                                           @RequestBody MultipartFile file)
            throws IOException {
        String url = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/products/")
                .path(Objects.requireNonNull(id.toString()))
                .path("/image")
                .toUriString();
        String fileName = imageService.storeFile(file);
        ProductEntity product = productService.addImageToProduct(fileName, id);

        return ResponseEntity.created(URI.create(url)).body(product);

    }


    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id, @RequestBody ProductRequestDTO productModel) {
        ProductResponseDTO updatedProduct = productService.updateProduct(id, productModel);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}