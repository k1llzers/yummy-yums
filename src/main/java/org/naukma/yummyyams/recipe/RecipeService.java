package org.naukma.yummyyams.recipe;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.recipe.dto.RecipeCreateUpdateDto;
import org.naukma.yummyyams.recipe.dto.RecipeShortResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@EntityNotFoundMessage(errorMessage = "Can`t find recipe by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class RecipeService extends BaseService<RecipeEntity, RecipeCreateUpdateDto, Integer> {
    public List<RecipeShortResponseDto> getAll() {
        return ((RecipeMapper) mapper).toShortResponseList(getAllEntities());
    }
}
