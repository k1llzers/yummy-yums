package org.naukma.yummyyams.product.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.SneakyThrows;
import org.naukma.yummyyams.product.Store;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private static ObjectMapper mapper = new ObjectMapper();

    private Integer id;
    private String name;
    private Double price;
    private String weight;
    private String imgUrl;
    private Store store;

    @Override
    @SneakyThrows
    public String toString() {
        return mapper.writeValueAsString(this);
    }
}
