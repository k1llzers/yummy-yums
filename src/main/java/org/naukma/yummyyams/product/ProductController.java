package org.naukma.yummyyams.product;

import lombok.RequiredArgsConstructor;
import org.naukma.yummyyams.product.dto.CanBeAddedToRecipeDto;
import org.naukma.yummyyams.product.dto.ProductDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService service;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProductSimilarToInput(@RequestParam String input,
                                                                     @RequestParam(defaultValue = "10") Integer limit) {
        return ResponseEntity.ok(service.getProductsBySimilarity(input, limit));
    }

    @GetMapping("/can-be-added-to-recipe/{input}")
    public ResponseEntity<CanBeAddedToRecipeDto> canBeAddedToRecipe(@PathVariable String input) {
        return ResponseEntity.ok(service.canBeAddedToRecipe(input));
    }
}
