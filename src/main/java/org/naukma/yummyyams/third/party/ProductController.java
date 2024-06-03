package org.naukma.yummyyams.third.party;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.product.ProductEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Set;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final SilpoService silpoService;
    private final AtbService atbService;
    private final NovusService novusService;
    private final ProductMatcherLevenshtein productMatcherLevenshtein;

    @GetMapping("/silpo")
    public ResponseEntity<Set<ProductEntity>> getProductsSilpo() {
        return ResponseEntity.ok(silpoService.getFirstListProducts());
    }

    @GetMapping("/atb")
    public ResponseEntity<Set<ProductEntity>> getProductsAtb() {
        return ResponseEntity.ok(atbService.getProducts());
    }

    @GetMapping("/novus")
    public ResponseEntity<Set<ProductEntity>> getProductsNovus() {
        return ResponseEntity.ok(novusService.getProducts());
    }
}
