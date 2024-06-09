package org.naukma.yummyyams.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.naukma.yummyyams.product.Store;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Integer id;
    private String name;
    private Double price;
    private String weight;
    private String imgUrl;
    private Store store;
}
