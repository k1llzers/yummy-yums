package org.naukma.yummyyams.family;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.family.dto.FamilyCreateUpdateDto;
import org.naukma.yummyyams.family.dto.FamilyResponseDto;
import org.naukma.yummyyams.mapper.MapperConfig;
import org.naukma.yummyyams.user.UserEntity;
import org.naukma.yummyyams.user.UserMapper;
import org.naukma.yummyyams.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@org.mapstruct.Mapper(config = MapperConfig.class, uses = {UserMapper.class})
public abstract class FamilyMapper implements Mapper<FamilyEntity, FamilyCreateUpdateDto> {
    @Autowired
    protected UserService userService;

    @Override
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "participants", expression = "java(mapUsersIdToUsersEntity(dto.getUsersId()))")
    public abstract FamilyEntity mergeCreate(FamilyCreateUpdateDto dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "participants", expression = "java(mapUsersIdToUsersEntity(dto.getUsersId()))")
    public abstract void mergeUpdate(@MappingTarget FamilyEntity entity, FamilyCreateUpdateDto dto);

    @Override
    public abstract FamilyResponseDto toResponseDto(FamilyEntity entity);

    protected List<UserEntity> mapUsersIdToUsersEntity(List<Integer> usersId) {
        return usersId.stream()
                .map(this::getUserById)
                .collect(Collectors.toList());
    }

    protected UserEntity getUserById(Integer id) {
        return userService.getById(id);
    }
}
