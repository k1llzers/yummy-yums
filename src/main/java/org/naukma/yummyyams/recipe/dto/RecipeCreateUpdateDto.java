package org.naukma.yummyyams.recipe.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.base.GettableById;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecipeCreateUpdateDto implements GettableById<Integer> {
    private Integer id;
    private String name;
    private String description;
    private String instruction;
    private Map<String, String> productToCountMap;
    private Integer categoryId;
}
