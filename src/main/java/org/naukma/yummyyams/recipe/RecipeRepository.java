package org.naukma.yummyyams.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, Integer> {
    List<RecipeEntity> findAllByCategory_Id(Integer category_id);

    List<RecipeEntity> findAllByNameLikeIgnoreCase(String name);

    @Query(value = "select recipe.ingredients from RecipeEntity recipe")
    List<String> findProductsInRecipes();

    @Query(value = "select recipe.ingredients from RecipeEntity recipe where recipe.category.id = :categoryId")
    List<String> findProductsInRecipesByCategory(@Param("categoryId") Integer categoryId);
}
