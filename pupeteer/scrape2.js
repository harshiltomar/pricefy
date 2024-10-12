import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const allBooks = [];
  let currentPage = 1;
  const maxPages = 10;

  const url = "https://books.toscrape.com/";

  // Get the page content
  const content = await page.content();

  // Load the content into Cheerio
  const $ = cheerio.load(content);

  // Scrape book information
  $(".product_pod").each((index, element) => {
    const title = $(element).find("h3 a").attr("title");
    const price = $(element).find(".price_color").text();
    const instock =
      $(element).find(".instock.availability").length > 0
        ? "In Stock"
        : "Out of Stock";
    const rating = $(element).find(".star-rating").attr("class").split(" ")[1];
    const link = $(element).find("h3 a").attr("href");

    allBooks.push({ title, price, instock, rating, link });
  });

  console.log(allBooks);
  await browser.close();
};

scrape();
