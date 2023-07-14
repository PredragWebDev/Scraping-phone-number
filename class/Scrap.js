
const puppeteer = require("puppeteer");

const fs = require('fs');
const cheerio = require("cheerio");
const { promises } = require('dns');

const url = 'https://www.remax.com/real-estate-agents?filters={page:1,count:96,sortBy:lastName}';

const getPhone_number = async ( from, to) => {
  let count = 0;
  let result = [];
  let isError = false;
  // chromeOptions.headless();
  
  do {

    try {

      let browser = await puppeteer.launch({ headless: false });

      let name, phone;

      let page = await browser.newPage();
      
      for (let i = from; i < to; i++) {
        
        await page.goto(`https://www.remax.com/real-estate-agents?filters={page:${i+1},count:96,sortBy:lastName}`, { waitUntil: 'networkidle0', timeout: 0 });

        const mans = await page.$$('div[data-test="agent-card"]');
  
        for (let card of mans ) {
  
          name = "";
          phone = "";
  
          phone = await card.$eval('a[data-test="agent-card-phone"]', a => a.textContent);
          name = await card.$eval('a[data-test="agent-card-name"]', a => a.textContent);
  
          const card_detail = {
            name,
            phone
          }
  
          result.push(card_detail);
        }
      }


      browser.close();

      isError = false;
    
      
    } catch (error) {
      console.log(error);

      isError = true;
    }
  } while (isError)

  return result;
  
};

module.exports = {
  getPhone_number,
};