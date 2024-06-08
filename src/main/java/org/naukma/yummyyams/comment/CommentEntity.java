package org.naukma.yummyyams.comment;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.naukma.yummyyams.base.GettableById;
import org.naukma.yummyyams.recipe.RecipeEntity;
import org.naukma.yummyyams.user.UserEntity;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comment")
public class CommentEntity implements GettableById<Integer> {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "comment")
    private String comment;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private RecipeEntity recipe;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @OneToMany(mappedBy = "replyTo", fetch = FetchType.EAGER)
    private List<CommentEntity> replies;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reply_to_id")
    private CommentEntity replyTo;
}
