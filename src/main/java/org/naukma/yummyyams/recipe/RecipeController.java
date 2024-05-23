package org.naukma.yummyyams.recipe;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.recipe.dto.RecipeCreateUpdateDto;
import org.naukma.yummyyams.recipe.dto.RecipeResponseDto;
import org.naukma.yummyyams.recipe.dto.RecipeShortResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeResponseDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getResponseDto(id));
    }

    @GetMapping
    public ResponseEntity<List<RecipeShortResponseDto>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}
