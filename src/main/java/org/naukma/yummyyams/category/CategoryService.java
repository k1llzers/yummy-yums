package org.naukma.yummyyams.category;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.category.dto.CategoryCreateUpdateDto;
import org.naukma.yummyyams.category.dto.CategoryResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@EntityNotFoundMessage(errorMessage = "Can`t find category by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class CategoryService extends BaseService<CategoryEntity, CategoryCreateUpdateDto, Integer> {
    public List<CategoryResponseDto> getAll() {
        return ((CategoryMapper) mapper).toResponseDtoList(getAllEntities());
    }
}
