package org.naukma.yummyyams.recipe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.user.dto.UserShortResponse;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeRequestDto {
    private Integer id;
    private String name;
    private UserShortResponse author;
    private String description;
}
