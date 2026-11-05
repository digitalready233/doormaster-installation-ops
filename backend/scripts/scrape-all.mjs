import { scrapeAllPages } from '../src/scraper-service.ts';

const startPage = Number(process.argv[2]) || 1;
const endPage = Number(process.argv[3]) || 28;

console.log(`[DoorMaster Scraper] Running deep scrape from page ${startPage} to ${endPage} using Prisma ORM...`);

scrapeAllPages(startPage, endPage)
  .then(res => {
    console.log(`\n======================================================`);
    console.log(`[Prisma Scraper] Scraping complete! Scraped & stored ${res.totalDoors} doors across ${res.totalCategories} categories.`);
    console.log(`======================================================\n`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal scrape error:', err);
    process.exit(1);
  });
