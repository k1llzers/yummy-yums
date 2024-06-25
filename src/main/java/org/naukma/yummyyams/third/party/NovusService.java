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
public class NovusService implements ScrapeService {
    public Set<ProductEntity> getProducts() {
        Set<ProductEntity> responseDTOS = new HashSet<>();
        for (String category: categoriesLinks) {
            WebDriver driver = initDriver(category);
            log.info("Start scrap from: " + category);
            int page = 1;
            boolean moreProductsPresent = true;
            do {
                log.info("get from page: " + page);
                Elements productsElements = getElementsOfProducts(driver);
                log.info("find " + productsElements.size() + " products on page");
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
        log.info(responseDTOS.size() + " products scraped from novus");
        return responseDTOS;
    }

    private WebDriver initDriver(String url) {
        WebDriver driver = new ChromeDriver();
        driver.get(url);
        return driver;
    }

    private Elements getElementsOfProducts(WebDriver driver) {
        WebElement productsList = getProductList(driver);
        String htmlCode = productsList.getAttribute("innerHTML");
        Document parse = Jsoup.parse(htmlCode);
        return parse.getElementsByClass("catalog-products__item");
    }

    private WebElement getProductList(WebDriver driver) {
        try {
            return driver.findElement(By.className("catalog-products__products"));
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
        if (weight.equals("за кг"))
            weight = "1кг";
        if (weight.contains("за"))
            weight = weight.replace("за", "");
        weight = weight.replace(" ", "");
        String img = "https://novus.online/" + getProductImage(element);
        return ProductEntity.builder()
                .name(title)
                .price(Double.parseDouble(price))
                .weight(weight)
                .imgUrl(img)
                .store(Store.NOVUS)
                .build();
    }

    private String getProductTitle(Element element) {
        Elements titleElem = element.getElementsByClass("base-card__label");
        if (titleElem.isEmpty())
            throw new NoTitleException();
        return titleElem.getFirst().text();
    }

    private String getProductPrice(Element element) {
        return element.getElementsByClass("product-card-price__current").getFirst().text();
    }

    private String getProductWeight(Element element) {
        return element.getElementsByClass("base-card__capacity").getFirst().text();
    }

    private String getProductImage(Element element) {
        try {
            return element.getElementsByClass("base-image__img").getFirst().attribute("src").getValue();
        } catch (Exception ex) {
            log.error("failed getting image on elem: " + element);
        }
        return "";
    }

    private boolean goToNextPage(WebDriver driver) {
        try {
            WebElement nextButton = driver.findElement(By.className("base-pagination-pages__arrow_right"));
            nextButton.click();
            Thread.sleep(2000);
            return true;
        } catch (Exception e) {
            log.info("No more pages to load or could not navigate to the next page");
            return false;
        }
    }

    private final List<String> categoriesLinks = List.of("https://novus.online/category/frukti-agodi", "https://novus.online/category/podovij-hlib",
            "https://novus.online/category/moloko-verski", "https://novus.online/category/sir-kislomolocnij",
            "https://novus.online/category/hlib", "https://novus.online/category/siri",
            "https://novus.online/category/baget-ciabata-lavas", "https://novus.online/category/gribi",
            "https://novus.online/category/verski", "https://novus.online/category/horikhy-ta-nasinnya",
            "https://novus.online/category/hlibci-ta-suhari", "https://novus.online/category/verski-2",
            "https://novus.online/category/smetana", "https://novus.online/category/zelen",
            "https://novus.online/category/maslo-i-margarin", "https://novus.online/category/sumis-gorihiv-ta-suhofruktiv",
            "https://novus.online/category/ajca", "https://novus.online/category/bulocki-slojki",
            "https://novus.online/category/ovoci", "https://novus.online/category/suhofrukti-ta-cukati",
            "https://novus.online/category/svize-maso", "https://novus.online/category/saslik-stejki",
            "https://novus.online/category/kovbasni-virobi-i-delikatesi", "https://novus.online/category/ikra",
            "https://novus.online/category/olia", "https://novus.online/category/farsh-ta-kotlety",
            "https://novus.online/category/sousi", "https://novus.online/category/masni-napivfabrikati",
            "https://novus.online/category/khamon", "https://novus.online/category/ocet",
            "https://novus.online/category/pripravi", "https://novus.online/category/moreprodukty",
            "https://novus.online/category/sil", "https://novus.online/category/steyky",
            "https://novus.online/category/salo", "https://novus.online/category/cukor",
            "https://novus.online/category/riba", "https://novus.online/category/subprodukti",
            "https://novus.online/category/vse-dla-vipicki", "https://novus.online/category/dla-susi",
            "https://novus.online/category/med-2", "https://novus.online/category/olivki",
            "https://novus.online/category/konservacia", "https://novus.online/category/pasti",
            "https://novus.online/category/iza-svidkogo-prigotuvanna", "https://novus.online/category/suhi-snidanki",
            "https://novus.online/category/borosno", "https://novus.online/category/makaronni-virobi",
            "https://novus.online/category/krupi", "https://novus.zakaz.ua/uk/categories/eighteen-plus/", "https://novus.zakaz.ua/uk/categories/drinks/");
}
