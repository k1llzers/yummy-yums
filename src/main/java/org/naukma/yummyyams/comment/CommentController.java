package org.naukma.yummyyams.comment;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.comment.dto.CommentCreateUpdateDto;
import org.naukma.yummyyams.comment.dto.CommentResponseDto;
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
@RequestMapping("/api/comment")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping()
    public ResponseEntity<Integer> create(@RequestBody CommentCreateUpdateDto body) {
        return ResponseEntity.ok(commentService.create(body));
    }

    @PutMapping()
    public ResponseEntity<Boolean> update(@RequestBody CommentCreateUpdateDto body) {
        return ResponseEntity.ok(commentService.update(body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> delete(@PathVariable Integer id) {
        return ResponseEntity.ok(commentService.delete(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommentResponseDto> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(commentService.getResponseDto(id));
    }
}
