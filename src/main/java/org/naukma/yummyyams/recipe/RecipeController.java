package org.naukma.yummyyams.recipe;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.recipe.dto.RecipeCreateUpdateDto;
import org.naukma.yummyyams.recipe.dto.RecipeRequestDto;
import org.naukma.yummyyams.recipe.dto.RecipeResponseDto;
import org.naukma.yummyyams.recipe.dto.RecipeShortResponseDto;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/recipe")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService service;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Integer> create(@RequestPart RecipeCreateUpdateDto recipe,  @RequestPart MultipartFile photo) {
        return ResponseEntity.ok(service.create(recipe, photo));
    }

    @PutMapping
    public ResponseEntity<Boolean> update(@RequestPart RecipeCreateUpdateDto recipe,  @RequestPart MultipartFile photo) {
        return ResponseEntity.ok(service.update(recipe, photo));
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<Boolean> approve(@PathVariable Integer id) {
        return ResponseEntity.ok(service.approveRecipe(id));
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<Integer> like(@PathVariable Integer id) {
        return ResponseEntity.ok(service.likeRecipe(id));
    }

    @PutMapping("/unlike/{id}")
    public ResponseEntity<Integer> unlike(@PathVariable Integer id) {
        return ResponseEntity.ok(service.unlikeRecipe(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getResponseDto(id));
    }

    @GetMapping("/get-recipe-image/{id}")
    public ResponseEntity<Resource> getRecipePhoto(@PathVariable Integer id) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(service.getPhoto(id));
    }

    @GetMapping("/get-my")
    public ResponseEntity<List<RecipeShortResponseDto>> getMyRecipes() {
        return ResponseEntity.ok(service.getMyRecipes());
    }

    @GetMapping("/get-by-user/{id}")
    public ResponseEntity<List<RecipeShortResponseDto>> getRecipesByUserId(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getRecipesByUserId(id));
    }

    @GetMapping("/get-my-liked")
    public ResponseEntity<List<RecipeShortResponseDto>> getMyLikedRecipes() {
        return ResponseEntity.ok(service.getMyLikes());
    }

    @GetMapping("/products-in-scope")
    public ResponseEntity<List<String>> getAllProductsForScope(@RequestParam(required = false) String name,
                                                               @RequestParam(required = false) Integer categoryId) {
        return ResponseEntity.ok(service.getProductsForScope(categoryId, name));
    }

    @GetMapping("/get-requests")
    public ResponseEntity<List<RecipeRequestDto>> getRecipesRequest() {
        return ResponseEntity.ok(service.getRecipesRequest());
    }

    @GetMapping
    public ResponseEntity<List<RecipeShortResponseDto>> getAll(@RequestParam(required = false) String name,
                                                               @RequestParam(required = false) Integer categoryId,
                                                               @RequestParam(required = false) Set<String> ingredients) {
        return ResponseEntity.ok(service.getAll(categoryId, name, ingredients));
    }
}
