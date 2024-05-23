package org.naukma.yummyyams.third.party;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class SilpoService {
    public Set<ProductDto> getProducts() throws IOException {
        Set<ProductDto> responseDTOS = new HashSet<>();

        WebDriver driver = new ChromeDriver();

        driver.get("https://shop.silpo.ua/category/ryba-4430?utm_source=silpo&utm_medium=site_button&utm_campaign=categories");

        log.info("Start scrap from: " + "https://shop.silpo.ua/category/ryba-4430?utm_source=silpo&utm_medium=site_button&utm_campaign=categories");
        log.info("count of pages: " + getCountOfPages(driver));
        int page = 1;
        do {
            log.info("get from page: " + page);
            WebElement productsList = getProductList(driver);
            String htmlCode = productsList.getAttribute("innerHTML");
            Document parse = Jsoup.parse(htmlCode);
            Elements elementsByClass = parse.getElementsByClass("products-list__item");

            for (Element elem : elementsByClass) {
                Elements titleElem = elem.getElementsByClass("product-card__title");
                if (titleElem.isEmpty())
                    continue;
                String title = titleElem.getFirst().text();
                String price = "";
                try {
                    price = elem.getElementsByClass("product-card-price").getFirst().getElementsByTag("div").get(1).text();
                } catch (Exception ex) {
                    log.error("failed getting price on elem: " + elem);
                }
                String weight = "";
                try {
                    weight = elem.getElementsByClass("ft-typo-14-semibold xl:ft-typo-16-semibold").getFirst().getElementsByTag("span").getFirst().text();
                } catch (Exception ex) {
                    log.error("failed weight price on elem: " + elem);
                }
                String img = "";
                try {
                    img = elem.getElementsByTag("img").getFirst().attribute("src").getValue();
                } catch (Exception ex) {
                    log.error("failed getting image on elem: " + elem);
                }
                ProductDto product = ProductDto.builder()
                        .name(title)
                        .price(price)
                        .weight(weight)
                        .img(img)
                        .build();
                responseDTOS.add(product);
            }
            page++;
        } while (goToNextPage(driver));
        driver.quit();

        return responseDTOS;
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
}
