package nl.novi.webshop.mappers;

import nl.novi.webshop.dtos.product.ProductRequestDTO;
import nl.novi.webshop.dtos.product.ProductResponseDTO;
import nl.novi.webshop.entities.ProductEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductDTOMapper implements DTOMapper<ProductResponseDTO, ProductRequestDTO, ProductEntity> {

    @Override
    public ProductResponseDTO mapToDTO(ProductEntity model) {
        var result = new ProductResponseDTO();
        result.setId(model.getId());
        result.setName(model.getName());
        result.setShortDescription(model.getShortDescription());
        return result;
    }

    @Override
    public List<ProductResponseDTO> mapToDTO(List<ProductEntity> models) {
        var result = new ArrayList<ProductResponseDTO>();
        for (ProductEntity model : models) {
            result.add(mapToDTO(model));
        }
        return result;
    }

    @Override
    public ProductEntity mapToEntity(ProductRequestDTO productModel) {
        var result = new ProductEntity();
        result.setName(productModel.getName());
        result.setShortDescription(productModel.getShortDescription());
        return result;
    }
}
