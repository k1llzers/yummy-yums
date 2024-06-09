package org.naukma.yummyyams.product;

import org.naukma.yummyyams.mapper.MapperConfig;
import org.naukma.yummyyams.product.dto.ProductDto;

import java.util.List;

@org.mapstruct.Mapper(config = MapperConfig.class)
public interface ProductMapper {
    List<ProductDto> toProductListDto(List<ProductEntity> entities);

    ProductDto toProductDto(ProductEntity entities);
}
