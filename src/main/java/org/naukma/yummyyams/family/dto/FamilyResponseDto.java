package org.naukma.yummyyams.family.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.user.dto.UserShortResponse;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class  FamilyResponseDto {
    private Integer id;
    private String name;
    private List<UserShortResponse> participants;
    private List<UserShortResponse> requests;
}
