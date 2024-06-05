package org.naukma.yummyyams.recipe;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.recipe.dto.RecipeCreateUpdateDto;
import org.naukma.yummyyams.recipe.dto.RecipeResponseDto;
import org.naukma.yummyyams.recipe.dto.RecipeShortResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/recipe")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class RecipeController {
    private final RecipeService service;

    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody RecipeCreateUpdateDto body) {
        return ResponseEntity.ok(service.create(body));
    }

    @PutMapping
    public ResponseEntity<Boolean> update(@RequestBody RecipeCreateUpdateDto body) {
        return ResponseEntity.ok(service.update(body));
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<Boolean> like(@PathVariable Integer id) {
        return ResponseEntity.ok(service.likeRecipes(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getResponseDto(id));
    }

    @GetMapping("/get-my")
    public ResponseEntity<List<RecipeShortResponseDto>> getMyRecipes() {
        return ResponseEntity.ok(service.getMyRecipes());
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

    @GetMapping
    public ResponseEntity<List<RecipeShortResponseDto>> getAll(@RequestParam(required = false) String name,
                                                               @RequestParam(required = false) Integer categoryId,
                                                               @RequestParam(required = false) Set<String> ingredients) {
        return ResponseEntity.ok(service.getAll(categoryId, name, ingredients));
    }
}
