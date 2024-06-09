package org.naukma.yummyyams.recipe;

import org.naukma.yummyyams.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, Integer>, JpaSpecificationExecutor<RecipeEntity> {
    Long countByAuthorAndApproveTrue(UserEntity author);

    List<RecipeEntity> findAllByAuthorAndApproveTrue(UserEntity author);

    List<RecipeEntity> findAllByAuthor(UserEntity author);

    List<RecipeEntity> findAllByApproveFalse();

    List<RecipeEntity> findAllByLikesContains(UserEntity author);
}
