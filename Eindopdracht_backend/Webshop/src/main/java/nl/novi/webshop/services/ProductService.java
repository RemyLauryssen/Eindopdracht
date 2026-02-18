package nl.novi.webshop.services;

import jakarta.transaction.Transactional;
import nl.novi.webshop.dtos.product.ProductRequestDTO;
import nl.novi.webshop.dtos.product.ProductResponseDTO;
import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.mappers.ProductDTOMapper;
import nl.novi.webshop.repositories.OrderItemRepository;
import nl.novi.webshop.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductDTOMapper productDTOMapper;
    private final OrderItemRepository orderItemRepository;

    public ProductService(ProductRepository productRepository,
                          ProductDTOMapper productDTOMapper, OrderItemRepository orderItemRepository) {
        this.productRepository = productRepository;
        this.productDTOMapper = productDTOMapper;
        this.orderItemRepository = orderItemRepository;
    }

    public List<ProductResponseDTO> findAllProducts() {
        return productDTOMapper.mapToDTO(productRepository.findAll());
    }

    public ProductResponseDTO findProductById(Long id) {
        return productDTOMapper.mapToDTO(getProductEntity(id));
    }

    public ProductResponseDTO createProduct(ProductRequestDTO productDTO) {
        ProductEntity product = productDTOMapper.mapToEntity(productDTO);
        return productDTOMapper.mapToDTO(productRepository.save(product));
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO) {
        ProductEntity product = getProductEntity(id);
        product.setName(requestDTO.getName());
        product.setShortDescription(requestDTO.getShortDescription());
        product.setPrice(requestDTO.getPrice());
        return productDTOMapper.mapToDTO(productRepository.save(product));
    }

    public void deleteProduct(Long id) {

        ProductEntity product = getProductEntity(id);

        if (orderItemRepository.existsByProductId(id)) {
            throw new IllegalStateException(
                    "Cannot delete product. It is used in existing orders."
            );
        }

        productRepository.delete(product);
    }

        @Transactional
    public void attachImageToProduct(Long productId, String fileName) {
        ProductEntity product = getProductEntity(productId);
        product.setImageFileName(fileName);
        productRepository.save(product);
    }

    public String getImageNameByProductId(Long productId) {
        ProductEntity product = getProductEntity(productId);
        if (product.getImageFileName() == null) {
            throw new RecordNotFoundException("Image for product " + productId + " not found.");
        }
        return product.getImageFileName();
    }


    private ProductEntity getProductEntity(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RecordNotFoundException("Product " + id + " not found"));
    }
}
