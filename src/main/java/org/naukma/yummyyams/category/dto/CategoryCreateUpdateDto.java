package org.naukma.yummyyams.category.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.base.GettableById;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryCreateUpdateDto implements GettableById<Integer> {
    private Integer id;
    private String name;
}
