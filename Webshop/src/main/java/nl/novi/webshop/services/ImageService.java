package nl.novi.webshop.services;

import nl.novi.webshop.entities.ProductEntity;
import nl.novi.webshop.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageService {

    private final Path fileStoragePath;
    private final ProductRepository productRepository;


    public ImageService(@Value("${my.upload_location}") String fileStorageLocation, ProductRepository productRepository) throws IOException {
        this.fileStoragePath = Paths.get(fileStorageLocation)
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(fileStoragePath);
        this.productRepository = productRepository;
    }


    public String storeProductImage(Long productId, MultipartFile file) {

        ProductEntity product = productRepository.findById(productId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Product not found"
        ));

        if (file.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Empty file"
            );
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Only image files allowed"
            );
        }

        String extension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        if (extension == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "File must have an extension"
            );
        }

        String storedFileName = UUID.randomUUID() + "." + extension;
        Path targetLocation = fileStoragePath.resolve(storedFileName).normalize();

        if (!targetLocation.startsWith(fileStoragePath)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid file path"
            );
        }

        try {
            Files.copy(
                    file.getInputStream(),
                    targetLocation,
                    StandardCopyOption.REPLACE_EXISTING
            );
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Failed to store file"
            );
        }
        product.setImageFileName(storedFileName);
        productRepository.save(product);

        return storedFileName;
    }

    public Resource loadProductImage(Long productId) {

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product not found"
                ));

        if (product.getImageFileName() == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Product has no image"
            );
        }

        return loadProductImage(product.getImageFileName());
    }

    public Resource loadProductImage(String fileName) {

        Path targetLocation = fileStoragePath.resolve(fileName).normalize();

        if (!targetLocation.startsWith(fileStoragePath)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Invalid file path"
            );
        }

        try {
            Resource resource = new UrlResource(targetLocation.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Image not found"
                );
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Could not read image"
            );
        }
    }

    public void deleteProductImage(Long productId) {

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Product not found"
                ));

        String imageFileName = product.getImageFileName();
        if (imageFileName == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Product has no image to delete"
            );
        }

        Path targetLocation = fileStoragePath.resolve(imageFileName).normalize();

        if (!Files.exists(targetLocation)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Image file not found"
            );
        }

        try {
            Files.delete(targetLocation);
            product.setImageFileName(null);
            productRepository.save(product);
        } catch (IOException e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Failed to delete image"
            );
        }
    }
}
