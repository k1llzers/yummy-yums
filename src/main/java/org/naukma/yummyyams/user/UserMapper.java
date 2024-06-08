package org.naukma.yummyyams.user;

import org.mapstruct.*;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.mapper.MapperConfig;
import org.naukma.yummyyams.recipe.RecipeRepository;
import org.naukma.yummyyams.user.dto.UserCreateUpdateDto;
import org.naukma.yummyyams.user.dto.UserResponse;
import org.naukma.yummyyams.user.dto.UserShortResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@org.mapstruct.Mapper(config = MapperConfig.class)
public abstract class UserMapper implements Mapper<UserEntity, UserCreateUpdateDto> {
    @Autowired
    protected PasswordEncoder encoder;

    @Autowired
    protected RecipeRepository recipeRepository;

    @Override
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    public abstract UserEntity mergeCreate(UserCreateUpdateDto dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "password", ignore = true)
    public abstract void mergeUpdate(@MappingTarget UserEntity entity, UserCreateUpdateDto dto);

    @Override
    @Mapping(target = "countOfRecipes", expression = "java(getCountOfRecipes(entity))")
    @Mapping(target = "countOfLikesOnMyRecipes", expression = "java(getCountOfLikesOnRecipes(entity))")
    public abstract UserResponse toResponseDto(UserEntity entity);

    @Mapping(target = "pib", expression = "java(entity.getPib())")
    public abstract UserShortResponse toShortResponse(UserEntity entity);

    public abstract List<UserShortResponse> toShortResponseDtoList(List<UserEntity> entities);

    protected Long getCountOfRecipes(UserEntity entity) {
        return recipeRepository.countByAuthorAndApproveTrue(entity);
    }

    protected Long getCountOfLikesOnRecipes(UserEntity entity) {
        return recipeRepository.findAllByAuthorAndApproveTrue(entity).stream()
                .mapToLong(recipe -> recipe.getLikes().size())
                .sum();
    }

    @BeforeMapping
    protected void encodePassword(UserCreateUpdateDto dto, @MappingTarget UserEntity entity) {
        if(dto.getPassword() != null) {
            entity.setPassword(encoder.encode(dto.getPassword()));
        }
    }
}
