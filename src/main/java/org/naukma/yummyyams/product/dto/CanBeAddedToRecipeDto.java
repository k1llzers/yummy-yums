package org.naukma.yummyyams.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CanBeAddedToRecipeDto {
    private Boolean canBeAdded;
    private String tooltip;
}
