package org.naukma.yummyyams.recipe;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import org.naukma.yummyyams.base.Storagable;
import org.naukma.yummyyams.category.CategoryEntity;
import org.naukma.yummyyams.comment.CommentEntity;
import org.naukma.yummyyams.recipe.dto.RecipeStatus;
import org.naukma.yummyyams.user.UserEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipe")
public class RecipeEntity implements Storagable<Integer> {
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

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_count_mapping",
            joinColumns = {@JoinColumn(name = "recipe_id", referencedColumnName = "id")})
    @MapKeyColumn(name = "product_name")
    @Column(name = "count")
    private Map<String, String> productToCountMap;

    @ElementCollection(targetClass = String.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "recipe_product", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "product", nullable = false)
    private Set<String> ingredients;

    @OneToMany(mappedBy = "recipe", fetch = FetchType.EAGER)
    private List<CommentEntity> comments = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "autor_id", referencedColumnName = "id")
    private UserEntity author;

    @ManyToMany(fetch = FetchType.EAGER)
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

    @Column(name = "status")
    @Enumerated(EnumType.ORDINAL)
    private RecipeStatus status;


    @Override
    public String getFolder() {
        return "recipesPhoto/";
    }
}
