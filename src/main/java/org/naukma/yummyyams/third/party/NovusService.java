package org.naukma.yummyyams.third.party;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.naukma.yummyyams.security.exception.NoTitleException;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class NovusService implements ScrapeService {
    public Set<ProductDto> getProducts() {
        Set<ProductDto> responseDTOS = new HashSet<>();
        WebDriver driver = initDriver("https://novus.online/category/riba");
        log.info("Start scrap from: " + "https://novus.online/category/riba");
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
        log.info(responseDTOS.size() + " products scraped from fish novus");
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

    private ProductDto getProductFromElem(Element element) {
        String title = getProductTitle(element);
        String price = getProductPrice(element);
        String weight = getProductWeight(element);
        if (weight.equals("за кг"))
            weight = "1кг";
        if (weight.contains("за"))
            weight = weight.replace("за", "");
        weight = weight.replace(" ", "");
        String img = "https://novus.online/" + getProductImage(element);
        return ProductDto.builder()
                .name(title)
                .price(price)
                .weight(weight)
                .img(img)
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
}
