// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import puppeteer from 'puppeteer-core';

// @Injectable()
// export class AmazonService {
//   constructor(private readonly configService: ConfigService) {}
//   async getProducts(products: string, numPages: number) {
//     // const browser = await puppeteer.connect({
//     //   browserWSEndpoint: this.configService.getOrThrow('SBR_WS_ENDPOINT'),
//     // });

//     const browser = await puppeteer.launch({
//       headless: true,
//       executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
//     });

//     try {
//       const page = await browser.newPage();
//       page.setDefaultNavigationTimeout(2 * 60 * 1000);
//       await Promise.all([
//         page.waitForNavigation(),
//         page.goto('https://amazon.com'),
//       ]);
//       await page.type('#twotabsearchtextbox', products);
//       await Promise.all([
//         page.waitForNavigation(),
//         page.click('#nav-search-submit-button'),
//       ]);
//       return await page.$$eval(
//         '.s-search-results .s-card-container',
//         (resultItems) =>
//           resultItems.map((resultItem) => {
//             const url = resultItem.querySelector('a').href;
//             const title = resultItem.querySelector(
//               '.s-title-instructions-style span',
//             )?.textContent;
//             const price = resultItem.querySelector(
//               '.a-price .a-offscreen',
//             )?.textContent;
//             return { url, title, price };
//           }),
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
export class AmazonService {
  constructor(private readonly configService: ConfigService) {}

  async getProducts(products: string, numPages: number) {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    });

    const allProducts = [];

    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await page.goto('https://amazon.com');

      await page.type('#twotabsearchtextbox', products);
      await Promise.all([
        page.click('#nav-search-submit-button'),
        page.waitForNavigation(),
      ]);

      for (let i = 0; i < numPages; i++) {
        const productsOnPage = await page.$$eval(
          '.s-search-results .s-card-container',
          (resultItems) =>
            resultItems.map((resultItem) => {
              const url = resultItem.querySelector('a').href;
              const title = resultItem.querySelector(
                '.s-title-instructions-style span',
              )?.textContent;
              const price = resultItem.querySelector(
                '.a-price .a-offscreen',
              )?.textContent;
              return { url, title, price };
            }),
        );

        allProducts.push(...productsOnPage);

        const nextButton = await page.$(
          '.s-pagination-container .s-pagination-next',
        );
        if (nextButton) {
          await Promise.all([
            nextButton.click(),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
          ]);
        } else {
          break;
        }
      }

      return allProducts;
    } finally {
      await browser.close();
    }
  }
}
