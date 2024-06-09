package org.naukma.yummyyams.user;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.user.dto.UserCreateUpdateDto;
import org.naukma.yummyyams.user.dto.UserResponse;
import org.naukma.yummyyams.user.dto.UserShortResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Integer> create(@RequestPart UserCreateUpdateDto user, @RequestPart(required = false) MultipartFile photo) {
        return ResponseEntity.ok(service.createReturnId(user, photo));
    }

    @PutMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<Boolean> update(@RequestPart UserCreateUpdateDto user, @RequestPart(required = false) MultipartFile photo) {
        return ResponseEntity.ok(service.update(user, photo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getResponseDto(id));
    }

    @GetMapping("/by-restrict/{restrict}")
    public ResponseEntity<List<UserShortResponse>> getById(@PathVariable String restrict) {
        return ResponseEntity.ok(service.getUsersByRestrict(restrict));
    }

    @GetMapping("/myself")
    public ResponseEntity<UserResponse> getMyselfInfo() {
        return ResponseEntity.ok(service.getMyselfInfo());
    }

    @GetMapping("/get-user-image/{id}")
    public ResponseEntity<Resource> getUserImage(@PathVariable Integer id) {
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(service.getPhoto(id));
    }
}
