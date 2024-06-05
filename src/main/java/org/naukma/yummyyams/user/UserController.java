package org.naukma.yummyyams.user;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.user.dto.UserCreateUpdateDto;
import org.naukma.yummyyams.user.dto.UserResponse;
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
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping
    public ResponseEntity<Integer> create(@RequestBody UserCreateUpdateDto body) {
        return ResponseEntity.ok(service.create(body));
    }

    @PutMapping
    public ResponseEntity<Boolean> update(@RequestBody UserCreateUpdateDto body) {
        return ResponseEntity.ok(service.update(body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getResponseDto(id));
    }

    @GetMapping("/myself")
    public ResponseEntity<UserResponse> getMyselfInfo() {
        return ResponseEntity.ok(service.getMyselfInfo());
    }
}
