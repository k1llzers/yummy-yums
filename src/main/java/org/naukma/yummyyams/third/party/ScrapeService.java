package org.naukma.yummyyams.third.party;

import org.naukma.yummyyams.product.ProductEntity;

import java.io.IOException;
import java.util.Set;

public interface ScrapeService {
    Set<ProductEntity> getProducts();
}
