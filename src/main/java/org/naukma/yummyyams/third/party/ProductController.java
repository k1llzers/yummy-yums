package org.naukma.yummyyams.third.party;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Set;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final SilpoService silpoService;

    @GetMapping
    public ResponseEntity<Set<ProductDto>> getProducts() throws IOException {
        return ResponseEntity.ok(silpoService.getProducts());
    }
}
