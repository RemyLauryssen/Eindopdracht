package nl.novi.webshop.services;


import jakarta.transaction.Transactional;
import nl.novi.webshop.dtos.product.ProductRequestDTO;
import nl.novi.webshop.dtos.product.ProductResponseDTO;
import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.entities.ProductImage;
import nl.novi.webshop.exceptions.RecordNotFoundException;
import nl.novi.webshop.mappers.ProductDTOMapper;
import nl.novi.webshop.repositories.FileUploadRepository;
import nl.novi.webshop.repositories.ProductRepository;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductDTOMapper productDTOMapper;
    private final FileUploadRepository fileUploadRepository;
    private final ImageService imageService;


    public ProductService(ProductRepository productRepository, ProductDTOMapper productDTOMapper, FileUploadRepository fileUploadRepository, ImageService imageService) {
        this.productRepository = productRepository;
        this.productDTOMapper = productDTOMapper;
        this.fileUploadRepository = fileUploadRepository;
        this.imageService = imageService;
    }

    public List<ProductResponseDTO> findAllProducts() {
        return productDTOMapper.mapToDTO(productRepository.findAll());
    }

    public ProductResponseDTO findProductById(Long id) {
        ProductEntity productEntity = getProductEntity(id);
        return productDTOMapper.mapToDTO(productEntity);
    }

    public ProductResponseDTO createProduct(ProductRequestDTO productDTO) {
        ProductEntity productEntity = productDTOMapper.mapToEntity(productDTO);
        productEntity = productRepository.save(productEntity);
        return productDTOMapper.mapToDTO(productEntity);
    }

    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO requestDTO) {
        ProductEntity existingProductEntity = getProductEntity(id);

        existingProductEntity.setName(requestDTO.getName());
        existingProductEntity.setShortDescription(requestDTO.getShortDescription());
        existingProductEntity.setPrice(requestDTO.getPrice());

        existingProductEntity = productRepository.save(existingProductEntity);
        return productDTOMapper.mapToDTO(existingProductEntity);
    }

    private ProductEntity getProductEntity(Long id) {
        ProductEntity existingProductEntity = productRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException("Product " + id + " not found"));
        return existingProductEntity;
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public Resource getImageFromProduct(Long id){
        Optional<ProductEntity> optionalProduct = productRepository.findById(id);
        if(optionalProduct.isEmpty()){
            throw new RecordNotFoundException("Product " + id + " not found.");
        }
        ProductImage image = optionalProduct.get().getProductImage();
        if(image == null){
            throw new RecordNotFoundException("Image for product " + id + " not found.");
        }
        return imageService.downLoadFile(image.getFileName());
    }

    @Transactional
    public ProductEntity addImageToProduct(String fileName, Long id) {
        Optional<ProductEntity> optionalProduct = productRepository.findById(id);
        Optional<ProductImage> optionalImage = fileUploadRepository.findByFileName(fileName);

        if (optionalProduct.isPresent() && optionalImage.isPresent()) {
            ProductImage image = optionalImage.get();
            ProductEntity product = optionalProduct.get();
            product.setProductImage(image);
            return productRepository.save(product);
        } else {
            throw new RecordNotFoundException("student of foto niet gevonden");
        }
    }

}
