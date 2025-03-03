package org.naukma.yummyyams.recipe;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.category.CategoryEntity;
import org.naukma.yummyyams.category.CategoryService;
import org.naukma.yummyyams.mapper.MapperConfig;
import org.naukma.yummyyams.recipe.dto.RecipeCreateUpdateDto;
import org.naukma.yummyyams.recipe.dto.RecipeRequestDto;
import org.naukma.yummyyams.recipe.dto.RecipeResponseDto;
import org.naukma.yummyyams.recipe.dto.RecipeShortResponseDto;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.mapstruct.Mapper(config = MapperConfig.class, imports = {SecurityContextAccessor.class})
public abstract class RecipeMapper implements Mapper<RecipeEntity, RecipeCreateUpdateDto> {
    @Autowired
    protected CategoryService categoryService;

    @Override
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "category", expression = "java(getCategoryById(dto.getCategoryId()))")
    @Mapping(target = "ingredients", expression = "java(dto.getProductToCountMap().keySet())")
    @Mapping(target = "author", expression = "java(SecurityContextAccessor.getUser())")
    @Mapping(target = "status", ignore = true)
    public abstract RecipeEntity mergeCreate(RecipeCreateUpdateDto dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "category", expression = "java(getCategoryById(dto.getCategoryId()))")
    @Mapping(target = "ingredients", expression = "java(dto.getProductToCountMap().keySet())")
    @Mapping(target = "status", ignore = true)
    public abstract void mergeUpdate(@MappingTarget RecipeEntity entity, RecipeCreateUpdateDto dto);

    @Override
    @Mapping(target = "countOfLikes", expression = "java(entity.getLikes().size())")
    @Mapping(target = "iLiked", expression = "java(isLiked(entity))")
    public abstract RecipeResponseDto toResponseDto(RecipeEntity entity);

    public abstract List<RecipeShortResponseDto> toShortResponseList(List<RecipeEntity> entities);

    public abstract List<RecipeRequestDto> toRecipeRequestList(List<RecipeEntity> entities);

    @Mapping(target = "countOfLikes", expression = "java(entity.getLikes().size())")
    @Mapping(target = "countOfComments", expression = "java(entity.getComments().size())")
    @Mapping(target = "iLiked", expression = "java(isLiked(entity))")
    public abstract RecipeShortResponseDto toShortResponseDto(RecipeEntity entity);

    protected CategoryEntity getCategoryById(Integer id) {
        return categoryService.getById(id);
    }

    protected Boolean isLiked(RecipeEntity entity) {
        if (!SecurityContextAccessor.isAuthenticated())
            return false;
        return entity.getLikes().contains(SecurityContextAccessor.getUser());
    }
}
