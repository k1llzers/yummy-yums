package org.naukma.yummyyams.base;

import org.mapstruct.MappingTarget;

public interface Mapper<E, V> {
    E mergeCreate(V dto);

    void mergeUpdate(E entity, V dto);

    <T> T toResponseDto(E entity);
}
