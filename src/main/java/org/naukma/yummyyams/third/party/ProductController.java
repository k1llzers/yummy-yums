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
    private final AtbService atbService;
    private final NovusService novusService;

    @GetMapping("/silpo")
    public ResponseEntity<Set<ProductDto>> getProductsSilpo() throws IOException {
        return ResponseEntity.ok(silpoService.getProducts());
    }

    @GetMapping("/atb")
    public ResponseEntity<Set<ProductDto>> getProductsAtb() throws IOException {
        return ResponseEntity.ok(atbService.getProducts());
    }

    @GetMapping("/novus")
    public ResponseEntity<Set<ProductDto>> getProductsNovus() throws IOException {
        return ResponseEntity.ok(novusService.getProducts());
    }
}
