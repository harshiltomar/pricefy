import puppeteer from "puppeteer";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://books.toscrape.com/";
  await page.goto(url);

  //   const title = await page.title();
  //   console.log(`Page Title:`, title);

  const books = await page.evaluate(()=> {
    const bookElements = document.querySelectorAll('.product_pod');
    return Array.from(bookElements).map((book)=> {
        const title = book.querySelector('h3 a').getAttribute('title');
        const price = book.querySelector('.price_color').textContent;
        const instock = book.querySelector('.instock.availibility') ? 'In Stock' : ' Out of Stock';
        const rating = book.querySelector('.star-rating').className.split(' ')[1]

        return {title, price, instock, rating};
    })
  });

  console.log(books); // Returns a Nodelist

  await browser.close();
};

scrape();
