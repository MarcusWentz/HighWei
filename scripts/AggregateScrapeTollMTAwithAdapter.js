const puppeteer = require('puppeteer');
    (async () => { // REMOVE IN ADAPTER.JS
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/trucks', { waitUntil: 'networkidle2' });
        const featureArticle1 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[1]/li[1]'))[0];
        const text1 = await page.evaluate(el => { return el.textContent}, featureArticle1);
        const featureArticle2 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/div/div/ul[3]/li[1]'))[0];
        const text2 = await page.evaluate(el => { return el.textContent}, featureArticle2);
        await page.goto('https://new.mta.info/fares-and-tolls/bridges-and-tunnels/tolls-by-vehicle/cars', { waitUntil: 'networkidle2' });
        const featureArticle3 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[1]/li[1]'))[0];
        const text3 = await page.evaluate(el => { return el.textContent}, featureArticle3);
        const featureArticle4 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[2]/li[4]'))[0];
        const text4 = await page.evaluate(el => { return el.textContent}, featureArticle4);
        const featureArticle5 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[3]/li[1]'))[0];
        const text5 = await page.evaluate(el => { return el.textContent}, featureArticle5);
        const featureArticle6 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[4]/li[1]'))[0];
        const text6 = await page.evaluate(el => { return el.textContent}, featureArticle6);
        const featureArticle7 = (await page.$x('/html/body/div[1]/div/div/section/div[4]/article/div/div/div/div/div/ul[4]/li[4]'))[0];
        const text7 = await page.evaluate(el => { return el.textContent}, featureArticle7);
        await browser.close();
        let priceArray = [];
        priceArray.push(text1.slice(10,text1.length)*100);
        priceArray.push(text2.slice(10,text2.length)*100);
        priceArray.push(text3.slice(13,text3.length)*100);
        priceArray.push(text4.slice(37,text4.length)*100);
        priceArray.push(text5.slice(11,text5.length)*100);
        priceArray.push(text6.slice(11,text6.length)*100);
        priceArray.push(text7.slice(30,text7.length)*100);
        priceArray.sort(function(a, b){return a - b});
        console.log(priceArray); // REMOVE IN ADAPTER.JS
        let medianPrice = priceArray[Math.floor(priceArray.length/2)];
        console.log(Math.round(medianPrice)); // REMOVE IN ADAPTER.JS
        return BigInt(Math.round(medianPrice)); // BigInt to handle uint errors with Adapter.js
    })(); // REMOVE IN ADAPTER.JS
