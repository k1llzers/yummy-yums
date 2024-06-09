package org.naukma.yummyyams.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
    @Query("select count(*) = 0 from CategoryEntity category right join RecipeEntity recipe on recipe.category = category where category.id = :categoryId")
    Boolean canBeDeleted(@Param("categoryId") Integer categoryId);
}
