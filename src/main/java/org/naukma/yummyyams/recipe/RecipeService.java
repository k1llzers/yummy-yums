package org.naukma.yummyyams.recipe;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.BaseService;
import org.naukma.yummyyams.category.CategoryEntity;
import org.naukma.yummyyams.recipe.dto.RecipeCreateUpdateDto;
import org.naukma.yummyyams.recipe.dto.RecipeShortResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@EntityNotFoundMessage(errorMessage = "Can`t find recipe by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class RecipeService extends BaseService<RecipeEntity, RecipeCreateUpdateDto, Integer> {
    private final EntityManager em;

    public List<RecipeShortResponseDto> getAll() {
        return ((RecipeMapper) mapper).toShortResponseList(findRecipeByCategoryNameAndProducts(null, null, null));
    }

    public List<RecipeEntity> findRecipeByCategoryNameAndProducts(Integer categoryId, String name, Set<String> products) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<RecipeEntity> cq = cb.createQuery(RecipeEntity.class);

        Root<RecipeEntity> recipe = cq.from(RecipeEntity.class);
        List<Predicate> predicates = new ArrayList<>();

        if (categoryId != null) {
            Join<Object, Object> category = recipe.join("category", JoinType.LEFT);
            predicates.add(cb.equal(category.get("id"), categoryId));
        }
        cq.where(predicates.toArray(new Predicate[0]));

        return em.createQuery(cq).getResultList();
    }
}
