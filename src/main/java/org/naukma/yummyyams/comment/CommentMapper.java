package org.naukma.yummyyams.comment;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.comment.dto.CommentCreateUpdateDto;
import org.naukma.yummyyams.comment.dto.CommentResponseDto;
import org.naukma.yummyyams.mapper.MapperConfig;
import org.naukma.yummyyams.recipe.RecipeEntity;
import org.naukma.yummyyams.recipe.RecipeService;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.user.UserEntity;
import org.naukma.yummyyams.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;

@org.mapstruct.Mapper(config = MapperConfig.class, imports = {SecurityContextAccessor.class})
public abstract class CommentMapper implements Mapper<CommentEntity, CommentCreateUpdateDto> {
    @Autowired
    protected RecipeService recipeService;
    @Autowired
    protected UserService userService;

    @Override
    @Mapping(target = "recipe", expression = "java(getRecipeById(dto.getRecipeId()))")
    @Mapping(target = "user", expression = "java(SecurityContextAccessor.getUser())")
    public abstract CommentEntity mergeCreate(CommentCreateUpdateDto dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "recipe", ignore = true)
    @Mapping(target = "user",ignore = true)
    @Mapping(target = "replyTo", ignore = true)
    public abstract void mergeUpdate(@MappingTarget CommentEntity entity, CommentCreateUpdateDto dto);

    @Override
    public abstract CommentResponseDto toResponseDto(CommentEntity entity);

    protected RecipeEntity getRecipeById(Integer id) {
        return recipeService.getById(id);
    }

    protected UserEntity getUserById(Integer id) {
        return userService.getById(id);
    }
}
