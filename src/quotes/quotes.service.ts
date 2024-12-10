// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import puppeteer from 'puppeteer-core';

// @Injectable()
// export class QuotesService {
//   constructor(private readonly configService: ConfigService) {}

//   async getQuotes() {
//     const browser = await puppeteer.launch({
//       headless: true,
//       executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
//     });

//     try {
//       const page = await browser.newPage();
//       page.setDefaultNavigationTimeout(2 * 60 * 1000);
//       await Promise.all([
//         page.goto('https://quotes.toscrape.com'),
//         page.waitForNavigation(),
//       ]);
//       return await page.$$eval('.quote', (resultItems) =>
//         resultItems.map((resultItem) => {
//           const quote = resultItem.querySelector('.text')?.textContent;
//           const author = resultItem.querySelector('.author')?.textContent;
//           return { quote, author };
//         }),
//       );
//     } finally {
//       await browser.close();
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer-core';

@Injectable()
export class QuotesService {
  constructor(private readonly configService: ConfigService) {}

  async getQuotes(totalPages: number) {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    });

    const allQuotes = [];

    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await page.goto('https://quotes.toscrape.com');

      let pageNumber = 1;
      let hasNextPage = true;

      while (pageNumber <= totalPages && hasNextPage) {
        const quotesOnPage = await page.$$eval('.quote', (resultItems) =>
          resultItems.map((resultItem) => {
            const quote = resultItem.querySelector('.text')?.textContent;
            const author = resultItem.querySelector('.author')?.textContent;
            return { quote, author };
          }),
        );

        allQuotes.push({ page: pageNumber, quotes: quotesOnPage });

        const nextButton = await page.$('.next a');
        if (nextButton) {
          await Promise.all([nextButton.click(), page.waitForNavigation()]);
          pageNumber++;
        } else {
          hasNextPage = false;
        }
      }

      return allQuotes;
    } finally {
      await browser.close();
    }
  }
}
