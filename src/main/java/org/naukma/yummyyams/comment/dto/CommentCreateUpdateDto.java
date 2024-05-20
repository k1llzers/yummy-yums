package org.naukma.yummyyams.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.base.GettableById;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentCreateUpdateDto implements GettableById<Integer> {
    private Integer id;
    private Integer recipeId;
    private Integer userEmail;
    private Integer replyToId;
    private String comment;
}
