// "use server"

// import axios from "axios";
// import * as cheerio from 'cheerio';

// export async function scrapeAmazonProduct(url:string) {
//     if(!url) return;
    
//     const username = String(process.env.BRIGHT_DATA_USERNAME || 'brd-customer-hl_7452a0de-zone-priceify');
//     const password = String(process.env.BRIGHT_DATA_PASSWORD || '3tnoqph7tu69');
//     const port = 22225;
//     // Generate a Random session id
//     const session_id = (1000000 * Math.random()) | 0;
//     const options = {
//         auth: {
//           username: `${username}-session-${session_id}`,
//           password,
//         },
//         host: 'brd.superproxy.io',
//         port,
//         rejectUnauthorized: false,
//       }

//     try {
//         // Fetch the product page
//         const response = await axios.get(url, options);
//         console.log(response);
//         const $ = cheerio.load(response.data);

//         // Extract the product title
//         const title = $('#productTitle').text().trim();      
//         return title; 
//     } catch (error: any) {
//         throw new Error(`Failed to scrape product: ${error.message}`)
//     }
// }

import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeAmazonProduct(url: string) {
    if (!url) return;

    try {
        // Fetch the product page
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extract the product title
        const title = $('#productTitle').text().trim();
        return title;
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}