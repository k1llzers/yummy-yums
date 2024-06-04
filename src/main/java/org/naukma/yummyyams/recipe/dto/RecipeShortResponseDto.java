package org.naukma.yummyyams.recipe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.user.dto.UserShortResponse;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeShortResponseDto {
    private Integer id;
    private String name;
    private UserShortResponse author;
    private Set<String> ingredients;
    private Integer countOfLikes;
    private Integer countOfComments;
}
