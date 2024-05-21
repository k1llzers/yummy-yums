package org.naukma.yummyyams.recipe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeShortResponseDto {
    private Integer id;
    private String name;
    private List<String> ingredients;
    private Integer countOfLikes;
    private Integer countOfComments;
}
