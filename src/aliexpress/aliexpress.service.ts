import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer-core';

@Injectable()
export class AliexpressService {
  constructor(private readonly configService: ConfigService) {}
  async getProducts(products: string) {
    const browser = await puppeteer.connect({
      browserWSEndpoint: this.configService.getOrThrow('SBR_WS_ENDPOINT'),
    });

    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        page.goto('https://aliexpress.com'),
      ]);
      await page.type('#search-words', products);
      await Promise.all([
        page.waitForNavigation(),
        page.click('.search--submit--2VTbd-T'),
      ]);
      return await page.$$eval(
        '#card-list .multi--modalContext--1Hxqhwi',
        (resultItems) =>
          resultItems.map((resultItem) => {
            const url = resultItem.querySelector('a').href;
            const title = resultItem.querySelector(
              'a .multi--content--11nFIBL .multi--titleText--nXeOvyr',
            )?.textContent;
            const price = resultItem.querySelector(
              'a .multi--content--11nFIBL .multi--price-sale--U-S0jtj',
            )?.textContent;
            return { url, title, price };
          }),
      );
    } finally {
      await browser.close();
    }
  }
}
