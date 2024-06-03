package org.naukma.yummyyams.third.party;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.similarity.LevenshteinDistance;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@Component
public class ProductMatcherLevenshtein {
    private final LevenshteinDistance levenshtein = new LevenshteinDistance();

    private double calculateSimilarityPercent(String name1, String name2) {
        int distance = levenshtein.apply(name1, name2);
        int maxLength = Math.max(name1.length(), name2.length());
        if (maxLength == 0) return 0;
        return (1.0 - (double) distance / maxLength) * 100.0;
    }

    private ProductDto findMostSimilarProduct(ProductDto targetProduct, Collection<ProductDto> products) {
        ProductDto mostSimilarProduct = null;
        double highestSimilarity = 45;

        for (ProductDto product : products) {
            double similarity = calculateSimilarityPercent(targetProduct.getName(), product.getName());
            if (similarity > highestSimilarity) {
                highestSimilarity = similarity;
                mostSimilarProduct = product;
            }
        }
        log.info("find similar " + mostSimilarProduct + " with similarity: " + highestSimilarity);
        return mostSimilarProduct;
    }

    public List<ProductDto> findSimilar(ProductDto productDto, Collection<ProductDto> productDtosFromAtb, Collection<ProductDto> productDtosFromNovus) {
        log.info("start searching similar for " + productDto.getName());
        ProductDto mostSimilarInShop2 = findMostSimilarProduct(productDto, productDtosFromAtb);
        ProductDto mostSimilarInShop3 = findMostSimilarProduct(productDto, productDtosFromNovus);
        List<ProductDto> result = new ArrayList<>();
        result.add(mostSimilarInShop2);
        result.add(mostSimilarInShop3);
        return result;
    }
}
