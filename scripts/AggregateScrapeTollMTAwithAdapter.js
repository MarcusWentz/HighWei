const puppeteer = require('puppeteer');
    (async () => { // REMOVE IN ADAPTER.JS
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks', { waitUntil: 'networkidle2' }); //URL
        const featureArticle1 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[1]/li[1]'))[0]; //XPATH
        const text1 = await page.evaluate(el => { return el.textContent}, featureArticle1)
        const featureArticle2 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[3]/li[1]'))[0]; //XPATH
        const text2 = await page.evaluate(el => { return el.textContent}, featureArticle2);
        await browser.close();
        let price1 = text1.slice(10,text1.length)*100;
        let price2 = text2.slice(10,text2.length)*100;
        let averagePrice = Math.round( (price1+price2)/2);
        console.log(price1); // REMOVE IN ADAPTER.JS
        console.log(price2); // REMOVE IN ADAPTER.JS
        console.log(averagePrice); // REMOVE IN ADAPTER.JS
        return BigInt(averagePrice); // BigInt to handle uint errors with Adapter.js
    })(); // REMOVE IN ADAPTER.JS
