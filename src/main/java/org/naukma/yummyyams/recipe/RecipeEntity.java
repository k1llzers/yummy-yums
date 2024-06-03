package org.naukma.yummyyams.recipe;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.naukma.yummyyams.base.GettableById;
import org.naukma.yummyyams.category.CategoryEntity;
import org.naukma.yummyyams.comment.CommentEntity;
import org.naukma.yummyyams.user.UserEntity;

import java.util.List;
import java.util.Map;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipe")
public class RecipeEntity implements GettableById<Integer> {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "instruction")
    private String instruction;

    @ElementCollection
    @CollectionTable(name = "product_count_mapping",
            joinColumns = {@JoinColumn(name = "recipe_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "product_name")
    @Column(name = "count")
    private Map<String, String> productToCountMap;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "recipe_product", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "product", nullable = false)
    private List<String> products;

    @OneToMany(mappedBy = "recipe")
    private List<CommentEntity> comments;

    @ManyToOne
    @JoinColumn(name = "autor_id", referencedColumnName = "id")
    private UserEntity author;

    @ManyToMany
    @JoinTable(name = "recipe_like",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<UserEntity> likes;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private CategoryEntity category;

    @Column(name = "approve")
    private Boolean approve;
}
