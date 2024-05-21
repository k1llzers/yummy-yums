package org.naukma.yummyyams.category;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.category.dto.CategoryCreateUpdateDto;
import org.naukma.yummyyams.category.dto.CategoryResponseDto;
import org.naukma.yummyyams.mapper.MapperConfig;

import java.util.List;

@org.mapstruct.Mapper(config = MapperConfig.class)
public abstract class CategoryMapper implements Mapper<CategoryEntity, CategoryCreateUpdateDto> {
    @Override
    @Mapping(target = "id", ignore = true)
    public abstract CategoryEntity mergeCreate(CategoryCreateUpdateDto dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract void mergeUpdate(@MappingTarget CategoryEntity entity, CategoryCreateUpdateDto dto);

    @Override
    public abstract CategoryResponseDto toResponseDto(CategoryEntity entity);

    public abstract List<CategoryResponseDto> toResponseDtoList(List<CategoryEntity> entities);
}
