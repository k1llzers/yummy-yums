package org.naukma.yummyyams.recipe;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.category.CategoryEntity;
import org.naukma.yummyyams.recipe.dto.RecipeCreateUpdateDto;
import org.naukma.yummyyams.recipe.dto.RecipeShortResponseDto;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.springframework.data.jpa.domain.Specification.where;

@EntityNotFoundMessage(errorMessage = "Can`t find recipe by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class RecipeService extends BaseService<RecipeEntity, RecipeCreateUpdateDto, Integer> {
    public List<RecipeShortResponseDto> getAll() {
        return ((RecipeMapper) mapper).toShortResponseList(((RecipeRepository)repository)
                .findAll(where(hasCategory(null))));
    }

    private static Specification<RecipeEntity> hasCategory(CategoryEntity entity) {
        return (root, query, cb) -> cb.equal(root.get("category"), entity);
    }
}
