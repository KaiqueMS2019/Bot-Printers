const puppeteer = require('puppeteer');
const uuid = require('uuid')

const PrinterService = {
     getPrinterScreenshot: async (printerIp) => {
        console.log(`PrinterService :: getPrinterScreenshot :: ${printerIp}`)
        let browser = await puppeteer.launch({ headless: true });
        let page = await browser.newPage();
        await page.goto(printerIp, { waitUntil: "networkidle0", timeout: 60000 });
        await page.setViewport({ width: 1024, height: 800 });
        const fileName = uuid.v4()
        await page.screenshot({
            path: `./screenshot/${fileName}.jpg`,
            type: "jpeg",
        });
        await page.close();
        await browser.close();
        return fileName
    }
}

module.exports = PrinterService