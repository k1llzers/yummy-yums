package org.naukma.yummyyams.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.base.GettableById;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserCreateUpdateDto implements GettableById<Integer> {
    private Integer id;
    private String surname;
    private String name;
    private String email;
    private String password;
}
