const puppeteer = require('puppeteer');
    (async () => { // REMOVE IN ADAPTER.JS
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks', { waitUntil: 'networkidle2' }); //URL
        const featureArticle = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[1]/li[1]'))[0]; //XPATH
        const text = await page.evaluate(el => { return el.textContent}, featureArticle);
        await browser.close();
        console.log(text.slice(10,text.length)*100); // REMOVE IN ADAPTER.JS
        return BigInt(text.slice(10,text.length)*100); // BigInt to handle uint errors with Adapter.js
    })(); // REMOVE IN ADAPTER.JS
