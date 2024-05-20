package org.naukma.yummyyams.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDto {
    private Integer id;
    private String comment;
    private Integer recipeId;
    private Integer userId;
    private CommentResponseDto reply;
}
