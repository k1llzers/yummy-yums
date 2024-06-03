package org.naukma.yummyyams.product;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(propagation = Propagation.REQUIRED)
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public List<ProductDto> getProductsBySimilarity(String input, Integer limit) {
        List<ProductEntity> allOrderBySimilarity = productRepository.findAllOrderBySimilarity(input, limit);
        return productMapper.toProductListDto(allOrderBySimilarity);
    }
}
