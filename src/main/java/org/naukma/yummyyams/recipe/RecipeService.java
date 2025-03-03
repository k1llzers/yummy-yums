package org.naukma.yummyyams.recipe;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.base.EntityNotFoundMessage;
import org.naukma.yummyyams.base.service.StoragableService;
import org.naukma.yummyyams.category.CategoryEntity;
import org.naukma.yummyyams.category.CategoryEntity_;
import org.naukma.yummyyams.recipe.dto.RecipeCreateUpdateDto;
import org.naukma.yummyyams.recipe.dto.RecipeRequestDto;
import org.naukma.yummyyams.recipe.dto.RecipeShortResponseDto;
import org.naukma.yummyyams.recipe.dto.RecipeStatus;
import org.naukma.yummyyams.security.SecurityContextAccessor;
import org.naukma.yummyyams.user.UserService;
import org.naukma.yummyyams.utils.ImageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@EntityNotFoundMessage(errorMessage = "Can`t find recipe by id")
@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class RecipeService extends StoragableService<RecipeEntity, RecipeCreateUpdateDto, Integer> {
    private final EntityManager em;
    private final UserService userService;

    public List<RecipeShortResponseDto> getAll(Integer categoryId, String name, Set<String> products) {
        return ((RecipeMapper) mapper).toShortResponseList(findRecipeByCategoryNameAndProducts(categoryId, name, products));
    }

    public List<String> getProductsForScope(Integer categoryId, String name) {
        return findRecipeByCategoryNameAndProducts(categoryId, name, null).stream()
                .flatMap(recipe -> recipe.getIngredients().stream())
                .distinct()
                .toList();
    }

    public Boolean addPhotoToRecipe(Integer recipeId, MultipartFile photo) {
        return ImageService.saveImage(photo, getById(recipeId));
    }

    public List<RecipeShortResponseDto> getMyRecipes() {
        return ((RecipeMapper) mapper).toShortResponseList(((RecipeRepository)repository).findAllByAuthor(SecurityContextAccessor.getUser()));
    }

    public List<RecipeShortResponseDto> getRecipesByUserId(Integer userId) {
        return ((RecipeMapper) mapper).toShortResponseList(((RecipeRepository)repository).findAllByAuthorAndStatus(userService.getById(userId), RecipeStatus.APPROVE));
    }

    public List<RecipeShortResponseDto> getMyLikes() {
        return ((RecipeMapper) mapper).toShortResponseList(((RecipeRepository)repository).findAllByLikesContains(SecurityContextAccessor.getUser()));
    }

    public List<RecipeRequestDto> getRecipesRequest() {
        return ((RecipeMapper) mapper).toRecipeRequestList(((RecipeRepository)repository).findAllByStatus(RecipeStatus.IN_PROGRESS));
    }

    public Integer likeRecipe(Integer id) {
        RecipeEntity toLike = getById(id);
        toLike.getLikes().add(SecurityContextAccessor.getUser());
        repository.save(toLike);
        return toLike.getLikes().size();
    }

    public Integer unlikeRecipe(Integer id) {
        RecipeEntity toLike = getById(id);
        toLike.getLikes().remove(SecurityContextAccessor.getUser());
        repository.save(toLike);
        return toLike.getLikes().size();
    }

    public Boolean approveRecipe(Integer id) {
        return setNewStatus(id, RecipeStatus.APPROVE);
    }

    public Boolean rejectRecipe(Integer id) {
        return setNewStatus(id, RecipeStatus.REJECTED);
    }

    private Boolean setNewStatus(Integer id, RecipeStatus status) {
        RecipeEntity toApprove = getById(id);
        toApprove.setStatus(status);
        repository.save(toApprove);
        return true;
    }

    public List<RecipeEntity> findRecipeByCategoryNameAndProducts(Integer categoryId, String name, Set<String> products) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<RecipeEntity> cq = cb.createQuery(RecipeEntity.class);
        Root<RecipeEntity> recipe = cq.from(RecipeEntity.class);
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(recipe.get(RecipeEntity_.status), RecipeStatus.APPROVE));
        if (categoryId != null) {
            Join<RecipeEntity, CategoryEntity> category = recipe.join(RecipeEntity_.category, JoinType.LEFT);
            predicates.add(cb.equal(category.get(CategoryEntity_.id), categoryId));
        }
        if (name != null) {
            predicates.add(cb.like(cb.lower(recipe.get(RecipeEntity_.name)), "%" + name.toLowerCase() + "%"));
        }
        if (products != null) {
            for (String product : products) {
                predicates.add(cb.isMember(product, recipe.get(RecipeEntity_.ingredients)));
            }
        }
        cq.where(predicates.toArray(new Predicate[0]));
        return em.createQuery(cq).getResultList();
    }
}
