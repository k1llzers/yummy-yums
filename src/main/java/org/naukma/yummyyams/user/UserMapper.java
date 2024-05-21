package org.naukma.yummyyams.user;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.mapper.MapperConfig;
import org.naukma.yummyyams.user.dto.UserCreateUpdateDto;
import org.naukma.yummyyams.user.dto.UserResponse;
import org.naukma.yummyyams.user.dto.UserShortResponse;

@org.mapstruct.Mapper(config = MapperConfig.class)
public abstract class UserMapper implements Mapper<UserEntity, UserCreateUpdateDto> {
    @Override
    @Mapping(target = "id", ignore = true)
    public abstract UserEntity mergeCreate(UserCreateUpdateDto dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    public abstract void mergeUpdate(@MappingTarget UserEntity entity, UserCreateUpdateDto dto);

    @Override
    public abstract UserResponse toResponseDto(UserEntity entity);

    @Mapping(target = "pib", expression = "java(entity.getPib())")
    public abstract UserShortResponse toShortResponse(UserEntity entity);
}
