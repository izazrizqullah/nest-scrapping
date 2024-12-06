import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer-core';

@Injectable()
export class AllrecipesService {
  async getProducts(foods: string) {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    });

    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(2 * 60 * 1000);
      await Promise.all([
        page.waitForNavigation(),
        page.goto('https://allrecipes.com'),
      ]);
      await page.type('#mntl-search-form--open__search-input', foods);
      await Promise.all([
        page.waitForNavigation(),
        page.click('.mntl-search-form__button'),
      ]);
      return await page.$$eval(
        '#mntl-search-results_1-0 #mntl-search-results__content_1-0',
        (resultItems) =>
          resultItems.map((resultItem) => {
            const url = resultItem.querySelector('a').href;
            const title = resultItem.querySelector(
              '.card__content .card__title-text',
            )?.textContent;
            const ratings = resultItem.querySelector(
              '#mntl-recipe-card-meta_1-0 .mm-recipes-card-meta__rating-count-number',
            )?.textContent;
            return { url, title, ratings };
          }),
      );
    } finally {
      await browser.close();
    }
  }
}
