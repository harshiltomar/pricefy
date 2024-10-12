import puppeteer from "puppeteer";
import fs from "fs";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const allBooks =[];
  let currentPage = 1;
  const maxPages= 10;

  const url = "https://books.toscrape.com/";
  await page.goto(url);

  //   const title = await page.title();
  //   console.log(`Page Title:`, title);

  while(currentPage <= maxPages) {
    const books = await page.evaluate(()=> {
      const bookElements = document.querySelectorAll('.product_pod');
      return Array.from(bookElements).map((book)=> {
          const title = book.querySelector('h3 a').getAttribute('title');
          const price = book.querySelector('.price_color').textContent;
          const instock = book.querySelector('.instock.availibility') ? 'In Stock' : ' Out of Stock';
          const rating = book.querySelector('.star-rating').className.split(' ')[1];
          const link = book.querySelector('h3 a').getAttribute('href');
  
          return {title, price, instock, rating, link};
      })
    });

    currentPage++;
    allBooks.push(...books);
  }

  fs.writeFileSync('books.json', JSON.stringify(allBooks, null, 2));

  // console.log('Data saved as ', books); // Returns a Nodelist

  await browser.close();
};

scrape();
