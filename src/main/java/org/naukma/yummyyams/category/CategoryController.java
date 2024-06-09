package org.naukma.yummyyams.category;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.category.dto.CategoryCreateUpdateDto;
import org.naukma.yummyyams.category.dto.CategoryResponseDto;
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
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;

    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody CategoryCreateUpdateDto body) {
        return ResponseEntity.ok(service.createReturnId(body));
    }

    @PutMapping
    public ResponseEntity<Boolean> update(@RequestBody CategoryCreateUpdateDto body) {
        return ResponseEntity.ok(service.update(body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/with-can-be-deleted")
    public ResponseEntity<List<CategoryResponseDto>> canBeDeleted() {
        return ResponseEntity.ok(service.getAllWithCanBeDeleted());
    }
}
