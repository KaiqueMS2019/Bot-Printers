const puppeteer = require('puppeteer');
const uuid = require('uuid')
const fs = require('fs')

const PrinterService = {
     getPrinterScreenshot: async (printerIp, tmp = false) => {

        const defaultScreenshootFolder = './screenshot'

        const folderExists = fs.existsSync(defaultScreenshootFolder)
        if(!folderExists) fs.mkdirSync(defaultScreenshootFolder)
        
        console.log(`PrinterService :: getPrinterScreenshot :: ${printerIp}`)
        let browser = await puppeteer.launch({ headless: true });
        let page = await browser.newPage();
        await page.goto(printerIp, { waitUntil: "networkidle0", timeout: 60000 });
        await page.setViewport({ width: 1024, height: 800 });
        const fileName = uuid.v4()
        const filePath = (tmp) ? `./screenshot/tmp/${fileName}.jpg` : `./screenshot/${fileName}.jpg`
        await page.screenshot({
            path: filePath,
            type: "jpeg",
        });
        await page.close();
        await browser.close();
        return fileName
    }
}

module.exports = PrinterService