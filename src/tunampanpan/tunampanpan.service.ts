import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-core';

@Injectable()
export class TunampanpanService {
  async getProducts(products: string) {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    });

    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        page.goto('https://1688.com'),
      ]);
      await page.type('.ali-search-form #alisearch-input', products);
      await Promise.all([
        page.waitForNavigation(),
        page.keyboard.press('Enter'),
      ]);
      return await page.$$eval('.search-offer-wrapper', (resultItems) =>
        resultItems.map((resultItem) => {
          const url = resultItem.querySelector('a').href;
          const title = resultItem.querySelector('.title-text')?.textContent;
          const stock =
            resultItem.querySelector('.offer-desc-item')?.textContent;
          const price = resultItem.querySelector('.price-item')?.textContent;
          return { url, title, stock, price };
        }),
      );
    } finally {
      await browser.close();
    }
  }
}
