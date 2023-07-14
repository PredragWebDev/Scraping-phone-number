
const { By, until, Builder} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// const firefox = require('selenium-webdriver/firefox'); 
const puppeteer = require("puppeteer");

const fs = require('fs');
const cheerio = require("cheerio");
const { promises } = require('dns');

const url = 'https://www.familysearch.org/en/';

const getProductFromPOS = async ( from, to) => {
  let count = 0;
  let result = [];
  let isError = false;
  let chromeOptions = new chrome.Options();
  // chromeOptions.headless();
  
  do {

    try {

      let driver = new webdriver.Builder()
      .forBrowser(webdriver.Browser.CHROME)
      .setChromeOptions(chromeOptions)
      .build();

      await driver.get(url);
      await driver.sleep(5000);
      await driver.findElement(By.css("button[aria-label='Open Menu']")).click();
      await driver.navigate().forward();
      
      await driver.findElement(By.css('#signInLink')).click();
      await driver.wait(until.urlContains('login'), 10000);
      await driver.navigate().forward();
      await driver.sleep(5000);

      // await driver.findElement(By.css('#userName')).sendKeys('leobrown0921');
      // await driver.findElement(By.css('#password')).sendKeys('superage0611');
      // await driver.findElement(By.css('#login')).click();

      // await driver.wait(until.urlIs('https://www.familysearch.org/search/'), 10000);
      // await driver.get('https://www.familysearch.org/search/');
      // let browser = await puppeteer.launch({ headless: false });

      // let residential, bed, bath, price, currency, frequency, locate, area, studio;

  
      // let page = await browser.newPage();
    
      // await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
      // await page.click('button[aria-label="Open Menu"]')
      // await page.click('#signInLink');
      // await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
      // await page.goForward();
      // await page.type("#userName", "leobrown0921");
      // await page.type("#password", "superage0611");
      // await page.click('#login');

      // await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
      // await page.goForward();

      // await page.goto("https://www.familysearch.org/search/", { waitUntil: 'networkidle0', timeout: 0 })

      // const a_tags = await page.$$('a');
      // for (tag of a_tags) {
      //   let textContent = await page.evaluate(el => el.textContent, tag);
      //   if (textContent === 'Find') {
      //     tag.click();
      //   }
      // }
    
      // await page.waitForTimeout(3000);

      // for (let i = from; i < to; i ++) {

      //   if (i > 0) {

      //     const _url = `https://www.bayut.com/to-rent/property/uae/page-${i+1}/`;
  
      //     await page.goto(_url, { waitUntil: 'networkidle0', timeout: 0 });
  
      //     await page.waitForTimeout(3000);
      //   }

      //   const list_of_properties = await page.$$("li[role = 'article']");
  
      //   for (let property of list_of_properties) {
      //     residential = "";
      //     bed = "";
      //     studio = "";
      //     bath= "";
      //     area= "";
      //     locate = "";
      //     price = "";
      //     currency = "";
      //     frequency = "";
  
      //     residential = await property.$eval("span[aria-label = 'Type']", span => span.textContent);
  
      //     const exist_bed = await property.$("span[aria-label = 'Beds'")
      //     if (exist_bed !== null) 
      //     {
      //       bed = await property.$eval("span[aria-label = 'Beds']", span => span.textContent);
  
      //     }
      //     else {
      //       studio = await property.$eval("span[aria-label = 'Studio']", span => span.textContent);
      //     }
  
      //     bath = await property.$eval("span[aria-label = 'Baths']", span => span.textContent);
      //     area = await property.$eval("span[aria-label = 'Area']", span => span.textContent);
      //     const location_tag = await property.$("div[aria-label = Location");
      //     locate = await location_tag.$eval("div._00a37089", div => div.textContent);
  
      //     price = await property.$eval("span[aria-label = 'Price']", span => span.textContent);
      //     currency = await property.$eval("span[aria-label = 'Currency']", span => span.textContent);
      //     frequency = await property.$eval("span[aria-label = 'Frequency']", span => span.textContent);
  
      //     const property_detail = {
      //       residential,
      //       bed,
      //       studio,
      //       bath,
      //       area,
      //       locate,
      //       price,
      //       currency,
      //       frequency
      //     }
  
      //     result.push(property_detail);
  
      //     console.log("tesxts>>>", property_detail);
      //   }
      // }

      // browser.close();

      isError = false;
    
      
    } catch (error) {
      console.log(error);

      isError = true;
    }
  } while (isError)

  return result;
  
};

const getCount_of_page = async () => {
  let browser = await puppeteer.launch({ headless: false });

  let residential, bed, bath, price, currency, frequency, locate, area, studio;


  let page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
  const a_tags = await page.$$('a');
  for (tag of a_tags) {
    let textContent = await page.evaluate(el => el.textContent, tag);
    if (textContent === 'Find') {
      tag.click();
    }
  }

  await page.waitForTimeout(3000);

  const str_count_of_properties = await page.$eval("span[aria-label = 'Summary text']", span => span.textContent);

  console.log(str_count_of_properties);

  const test = str_count_of_properties.match(/(\d{1,3}(,\d{3})*)(?=\sProperties)/);

  const count_of_properties = Number(test[0].replace(/,/g,''));

  const count_of_page = Math.ceil(count_of_properties/24);

  return count_of_page;
}

module.exports = {
  getProductFromPOS,
  getCount_of_page
};