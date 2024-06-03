package org.naukma.yummyyams.third.party;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.naukma.yummyyams.product.ProductEntity;
import org.naukma.yummyyams.product.Store;
import org.naukma.yummyyams.security.exception.NoTitleException;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class SilpoService {
    public Set<ProductEntity> getFirstListProducts() {
        return getProducts(firstCategoriesLinks);
    }

    public Set<ProductEntity> getSecondListProducts() {
        return getProducts(secondCategoriesLinks);
    }

    public Set<ProductEntity> getProducts(List<String> cetegoryList) {
        Set<ProductEntity> responseDTOS = new HashSet<>();
        for (String category: cetegoryList) {
            WebDriver driver = initDriver(category);
            log.info("Start scrap from: " + category);
            log.info("count of pages: " + getCountOfPages(driver));
            int page = 1;
            boolean moreProductsPresent = true;
            do {
                log.info("get from page: " + page);
                Elements productsElements = getElementsOfProducts(driver);
                for (Element elem : productsElements) {
                    try {
                        responseDTOS.add(getProductFromElem(elem));
                    } catch (NoTitleException ignored) {
                    } catch (Exception e) {
                        moreProductsPresent = false;
                    }
                }
                page++;
            } while (goToNextPage(driver) && moreProductsPresent);
            driver.quit();
        }
        log.info(responseDTOS.size() + " products scraped from silpo");
        return responseDTOS;
    }

    private WebDriver initDriver(String url) {
        WebDriver driver = new ChromeDriver();
        driver.get(url);
        return driver;
    }

    private int getCountOfPages(WebDriver driver) {
        try {
            WebElement paginationElement = driver.findElement(By.className("pagination__items"));
            String htmlCode = paginationElement.getAttribute("innerHTML");
            Document parse = Jsoup.parse(htmlCode);
            return Integer.parseInt(parse.getElementsByTag("a").getLast().text());
        } catch (Exception ex) {
            log.warn("Waiting for loading pages");
            return getCountOfPages(driver);
        }
    }

    private Elements getElementsOfProducts(WebDriver driver) {
        WebElement productsList = getProductList(driver);
        String htmlCode = productsList.getAttribute("innerHTML");
        Document parse = Jsoup.parse(htmlCode);
        return parse.getElementsByClass("products-list__item");
    }

    private WebElement getProductList(WebDriver driver) {
        try {
            return driver.findElement(By.className("products-list"));
        } catch (Exception ex) {
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            log.warn("Waiting for product list loading");
            return getProductList(driver);
        }
    }

    private ProductEntity getProductFromElem(Element element) {
        String title = getProductTitle(element);
        String price = getProductPrice(element);
        String weight = getProductWeight(element);
        String img = getProductImage(element);
        return ProductEntity.builder()
                .name(title)
                .price(Double.parseDouble(price.replace(" грн", "")))
                .weight(weight)
                .imgUrl(img)
                .store(Store.SILPO)
                .build();
    }

    private String getProductTitle(Element element) {
        Elements titleElem = element.getElementsByClass("product-card__title");
        if (titleElem.isEmpty())
            throw new NoTitleException();
        return titleElem.getFirst().text();
    }

    private String getProductPrice(Element element) {
        return element.getElementsByClass("product-card-price").getFirst()
                .getElementsByTag("div").get(1).text();
    }

    private String getProductWeight(Element element) {
        return element.getElementsByClass("ft-typo-14-semibold xl:ft-typo-16-semibold").getFirst()
                .getElementsByTag("span").getFirst().text();
    }

    private String getProductImage(Element element) {
        try {
            return element.getElementsByTag("img").getFirst().attribute("src").getValue();
        } catch (Exception ex) {
            log.error("failed getting image on elem: " + element);
        }
        return "";
    }

    private boolean goToNextPage(WebDriver driver) {
        try {
            WebElement nextButton = driver.findElement(By.className("pagination-item--next-page"));
            nextButton.click();
            Thread.sleep(2000);
            return true;
        } catch (Exception e) {
            log.info("No more pages to load or could not navigate to the next page");
            return false;
        }
    }

    private final List<String> firstCategoriesLinks = List.of("https://shop.silpo.ua/category/frukty-ovochi-4788", "https://shop.silpo.ua/category/m-iaso-4411",
            "https://shop.silpo.ua/category/ryba-4430", "https://shop.silpo.ua/category/kovbasni-vyroby-i-m-iasni-delikatesy-4731",
            "https://shop.silpo.ua/category/syry-1468", "https://shop.silpo.ua/category/khlib-ta-khlibobulochni-vyroby-486");

    private final List<String> secondCategoriesLinks = List.of("https://shop.silpo.ua/category/molochni-produkty-ta-iaitsia-234", "https://shop.silpo.ua/category/lavka-tradytsii-4487",
            "https://shop.silpo.ua/category/zdorove-kharchuvannia-4864", "https://shop.silpo.ua/category/bakaliia-65",
            "https://shop.silpo.ua/category/konservy-sousy-prypravy-130", "https://shop.silpo.ua/category/kava-chai-359");
}
