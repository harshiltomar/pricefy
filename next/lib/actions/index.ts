import { scrapeAmazonProduct } from "../scraper";


export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;
 
    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl);

        //@ts-ignore
        if(!scrapedProduct) return;
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`)
    }
}