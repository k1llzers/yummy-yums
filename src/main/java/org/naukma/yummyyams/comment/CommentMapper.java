package org.naukma.yummyyams.comment;

import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.naukma.yummyyams.base.Mapper;
import org.naukma.yummyyams.comment.dto.CommentCreateUpdateDto;
import org.naukma.yummyyams.comment.dto.CommentResponseDto;
import org.naukma.yummyyams.mapper.MapperConfig;

@org.mapstruct.Mapper(config = MapperConfig.class)
public interface CommentMapper extends Mapper<CommentEntity, CommentCreateUpdateDto> {
    @Override
    CommentEntity mergeCreate(CommentCreateUpdateDto dto);

    @Override
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void mergeUpdate(@MappingTarget CommentEntity entity, CommentCreateUpdateDto dto);

    @Override
    CommentResponseDto toResponseDto(CommentEntity entity);
}
