package org.naukma.yummyyams;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.naukma.yummyyams.product.ProductEntity;
import org.naukma.yummyyams.product.ProductRepository;
import org.naukma.yummyyams.third.party.AtbService;
import org.naukma.yummyyams.third.party.NovusService;
import org.naukma.yummyyams.third.party.SilpoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@SpringBootApplication
@Slf4j
public class YummyYamsApplication {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SilpoService silpoService;
    @Autowired
    private AtbService atbService;
    @Autowired
    private NovusService novusService;

    public static void main(String[] args) {
        SpringApplication.run(YummyYamsApplication.class, args);
    }

    @Bean
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }

    @PostConstruct
    public void initProducts() {
        if (productRepository.count() < 16000) {
            log.info("start get products");
            ExecutorService executor = Executors.newFixedThreadPool(4);

            List<Callable<Set<ProductEntity>>> tasks = new ArrayList<>();
//            tasks.add(silpoService::getFirstListProducts);
//            tasks.add(silpoService::getSecondListProducts);
            tasks.add(atbService::getProducts);
            tasks.add(novusService::getProducts);

            try {
                log.info("waiting for products");
                List<Future<Set<ProductEntity>>> results = executor.invokeAll(tasks);
                log.info("products fetched");
                for (Future<Set<ProductEntity>> result : results) {
                    log.info("start saving");
                    productRepository.saveAll(result.get());
                    log.info("finish saving");
                }
                log.info("products saved");
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }

            executor.shutdown();
        }
    }
}
