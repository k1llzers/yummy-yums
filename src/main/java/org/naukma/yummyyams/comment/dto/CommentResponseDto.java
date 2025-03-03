package org.naukma.yummyyams.comment.dto;

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
public class CommentResponseDto {
    private Integer id;
    private String comment;
    private UserShortResponse user;
    private List<CommentResponseDto> replies;
}
