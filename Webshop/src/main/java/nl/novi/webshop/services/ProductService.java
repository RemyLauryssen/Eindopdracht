package nl.novi.webshop.services;


import nl.novi.webshop.dtos.product.ProductRequestDTO;
import nl.novi.webshop.dtos.product.ProductResponseDTO;
import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.mappers.ProductDTOMapper;
import nl.novi.webshop.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductDTOMapper productDTOMapper;


    public ProductService(ProductRepository productRepository, ProductDTOMapper productDTOMapper) {
        this.productRepository = productRepository;
        this.productDTOMapper = productDTOMapper;
    }



    public List<ProductResponseDTO> findAllProducts() {
        return productDTOMapper.mapToDTO(productRepository.findAll());
    }

    public ProductResponseDTO findProductById(Long id)  {
        ProductEntity productEntity = getProductEntity(id);
        return productDTOMapper.mapToDTO(productEntity);
    }

    public ProductResponseDTO createProduct(ProductRequestDTO productDTO) {
        ProductEntity productEntity = productDTOMapper.mapToEntity(productDTO);
        productEntity = productRepository.save(productEntity);
        return productDTOMapper.mapToDTO(productEntity);
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO)  {
        ProductEntity existingProductEntity = getProductEntity(id);

        existingProductEntity.setName(requestDTO.getName());
        existingProductEntity.setShortDescription(requestDTO.getShortDescription());
        existingProductEntity.setPrice(requestDTO.getPrice());

        existingProductEntity = productRepository.save(existingProductEntity);
        return productDTOMapper.mapToDTO(existingProductEntity);
    }

    private ProductEntity getProductEntity(Long id) {
        ProductEntity existingProductEntity = productRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Product " + id +" not found"));
        return existingProductEntity;
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

}
