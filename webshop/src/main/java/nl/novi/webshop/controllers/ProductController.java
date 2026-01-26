package nl.novi.webshop.controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import nl.novi.webshop.dtos.product.ProductRequestDTO;
import nl.novi.webshop.dtos.product.ProductResponseDTO;
import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.helpers.UrlHelper;
import nl.novi.webshop.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final UrlHelper urlHelper;

    public ProductController(ProductService productService, UrlHelper urlHelper) {
        this.productService = productService;
        this.urlHelper = urlHelper;
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