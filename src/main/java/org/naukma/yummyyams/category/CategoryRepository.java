package org.naukma.yummyyams.category;

import org.naukma.yummyyams.category.dto.CategoryResponseDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer> {
    @Query("SELECT new org.naukma.yummyyams.category.dto.CategoryResponseDto(c.id, c.name, (COUNT(r.id) = 0)) " +
            "FROM CategoryEntity c LEFT JOIN RecipeEntity r ON c.id = r.category.id " +
            "GROUP BY c.id, c.name")
    List<CategoryResponseDto> findWithCanBeDeleted();
}
