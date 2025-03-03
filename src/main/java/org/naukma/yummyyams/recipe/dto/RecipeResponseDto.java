package org.naukma.yummyyams.recipe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.category.dto.CategoryResponseDto;
import org.naukma.yummyyams.comment.dto.CommentResponseDto;
import org.naukma.yummyyams.user.dto.UserShortResponse;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeResponseDto {
    private Integer id;
    private String name;
    private String description;
    private String instruction;
    private Map<String, String> productToCountMap;
    private Set<String> ingredients;
    private List<CommentResponseDto> comments;
    private UserShortResponse author;
    private CategoryResponseDto category;
    private RecipeStatus status;
    private Integer countOfLikes;
    private Boolean iLiked;
}
