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
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
@RequiredArgsConstructor
public class AtbService implements ScrapeService {
    public Set<ProductDto> getProducts() {
        Set<ProductDto> responseDTOS = new HashSet<>();
        WebDriver driver = initDriver("https://www.atbmarket.com/catalog/353-riba-i-moreprodukti?page=" + 1);
        int page = 1;
        int countOfPage = getCountOfPage(driver);
        log.info("count of page: " + countOfPage);
        do {
            driver.quit();
            driver = initDriver("https://www.atbmarket.com/catalog/353-riba-i-moreprodukti?page=" + page);
            log.info("get from page: " + page);
            Elements productsElements = getElementsOfProducts(driver);
            for (Element elem : productsElements) {
                try {
                    responseDTOS.add(getProductFromElem(elem));
                } catch (NoTitleException ignored) {
                }
            }
            page++;
        } while (page <= countOfPage);
        driver.quit();
        log.info(responseDTOS.size() + " products scraped from fish silpo");
        return responseDTOS;
    }

    private WebDriver initDriver(String url) {
        ChromeOptions options = new ChromeOptions();
        WebDriver driver = new ChromeDriver(options);
        driver.get(url);
        log.info("Start scrap from: " + url);
        return driver;
    }

    private Elements getElementsOfProducts(WebDriver driver) {
        WebElement productsList = getProductList(driver);
        String htmlCode = productsList.getAttribute("innerHTML");
        Document parse = Jsoup.parse(htmlCode);
        return parse.getElementsByClass("catalog-item");
    }

    private WebElement getProductList(WebDriver driver) {
        try {
            return driver.findElement(By.className("catalog-list"));
        } catch (Exception ex) {
            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
            return getProductList(driver);
        }
    }

    private ProductDto getProductFromElem(Element element) {
        String weight = getProductWeight(element);
        String title = getProductTitle(element);
        String price = getProductPrice(element);
        String img = getProductImage(element);
        ProductDto product = ProductDto.builder()
                .name(title)
                .price(price)
                .weight(weight)
                .img(img)
                .build();
        if (weight.equals("/шт"))
            removeDimension(product);
        if (product.getWeight().contains("/"))
            product.setWeight(product.getWeight().replace("/", "1"));
        return product;
    }

    private String getProductTitle(Element element) {
        Elements titleElem = element.getElementsByClass("catalog-item__title");
        if (titleElem.isEmpty())
            throw new NoTitleException();
        return titleElem.getFirst().text();
    }

    private String getProductPrice(Element element) {
        return element.getElementsByClass("product-price__top").getFirst()
                .val();
    }

    private String getProductWeight(Element element) {
        return element.getElementsByClass("product-price__unit").getFirst().text();
    }

    private String getProductImage(Element element) {
        try {
            return element.getElementsByClass("catalog-item__img").getFirst().attribute("src").getValue();
        } catch (Exception ex) {
            log.error("failed getting image on elem: " + element);
        }
        return "";
    }

    private int getCountOfPage(WebDriver driver) {
        try {
            List<WebElement> paginationElements = driver.findElements(By.className("product-pagination__link"));
            return paginationElements.stream()
                    .mapToInt(this::getNumberOfPage)
                    .max()
                    .getAsInt();
        } catch (Exception e) {
            log.info("No more pages to load or could not navigate to the next page");
            return 0;
        }
    }

    public int getNumberOfPage(WebElement element) {
        int result;
        try {
            result = Integer.parseInt(element.getText());
        } catch (NumberFormatException nfe) {
            return 0;
        }
        return result;
    }

    public void removeDimension(ProductDto productDto) {
        String name = productDto.getName();
        // Регулярний вираз для пошуку розмірності (числа з комою або без і одиниці вимірювання)
        String regex = "\\d+[,.]?\\d*\\s?(л|мл|кг|г)?";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(productDto.getName());

        // Знайти розмірність
        if (matcher.find()) {
            // Отримати значення розмірності
            String dimension = matcher.group();

            productDto.setWeight(dimension.replace(" ", ""));
            // Видалити розмірність з рядка
            name = name.replace(dimension, "").trim();
            name = name.replace("  ", " ").trim();
        }
        productDto.setName(name);
    }
}
