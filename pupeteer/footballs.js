import puppeteer from "puppeteer";

const scrapeFootball = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://www.theguardian.com/football/tables";
  await page.goto(url);

  const title = await page.title();
  console.log(`Page Title:`, title);

  const standings = await page.evaluate(()=> {
    const standingsElements = document.querySelectorAll('.football-table__container');
    return Array.from(standingsElements).map((standings)=> {
        const leagueName = standings.querySelector('div div table caption a').textContent;

        return leagueName;
    })
  })

  console.log(standings);
};

scrapeFootball();