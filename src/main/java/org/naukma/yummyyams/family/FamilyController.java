package org.naukma.yummyyams.family;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.family.dto.FamilyCreateUpdateDto;
import org.naukma.yummyyams.family.dto.FamilyResponseDto;
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

@RestController
@RequestMapping("/api/family")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class FamilyController {
    private final FamilyService service;

    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody FamilyCreateUpdateDto body) {
        return ResponseEntity.ok(service.create(body));
    }

    @PutMapping
    public ResponseEntity<Boolean> update(@RequestBody FamilyCreateUpdateDto body) {
        return ResponseEntity.ok(service.update(body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FamilyResponseDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getResponseDto(id));
    }
}
