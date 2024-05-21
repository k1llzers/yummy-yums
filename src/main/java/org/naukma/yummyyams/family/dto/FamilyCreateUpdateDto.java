package org.naukma.yummyyams.family.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.base.GettableById;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FamilyCreateUpdateDto implements GettableById<Integer> {
    private Integer id;
    private String name;
    private List<Integer> usersId;
}
