package org.naukma.yummyyams.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    @Query(nativeQuery = true, value = "SELECT * FROM product ORDER BY similarity(:input, product.name) DESC LIMIT :limit")
    List<ProductEntity> findAllOrderBySimilarity(@Param("input") String input, @Param("limit") Integer limit);

    @Query(nativeQuery = true, value = "SELECT product.name FROM product ORDER BY similarity(:input, product.name) DESC LIMIT 1")
    String findMostSimilar(@Param("input") String input);

    @Query("select (count(p) > 0) from ProductEntity p where lower(p.name) like lower(CONCAT('% ', :input, ' %')) or " +
            "lower(p.name) like lower(CONCAT(:input, ' %')) or lower(p.name) like lower(CONCAT('% ', :input)) or lower(p.name) = lower(:input)")
    Boolean canBeAddedToRecipe(@Param("input") String input);
}
