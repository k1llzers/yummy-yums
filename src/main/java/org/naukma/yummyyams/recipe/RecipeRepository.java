package org.naukma.yummyyams.recipe;

import org.naukma.yummyyams.recipe.dto.RecipeStatus;
import org.naukma.yummyyams.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, Integer>, JpaSpecificationExecutor<RecipeEntity> {
    Long countByAuthorAndStatus(UserEntity author, RecipeStatus status);

    List<RecipeEntity> findAllByAuthorAndStatus(UserEntity author, RecipeStatus status);

    List<RecipeEntity> findAllByAuthor(UserEntity author);

    List<RecipeEntity> findAllByStatus(RecipeStatus status);

    List<RecipeEntity> findAllByLikesContains(UserEntity author);
}
