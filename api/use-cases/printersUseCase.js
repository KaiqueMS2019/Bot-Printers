const PrinterRepository = require('../repositories/printerRepository')
const PrinterService = require('../services/printerService')
const fs = require('fs')
const { CLIENT_RENEG_LIMIT } = require('tls')


const PrintersUseCase = {

    getListAllPrinters: () => {
        let allPrinters = PrinterRepository.getAllPrinters()
        return allPrinters
    },

    getPrinterScreenshot: async (ip) => {
        console.log(`PrintersUseCase :: getPrinterScreenshot :: ${ip}`)
        const printerScreenshotFileName = await PrinterService.getPrinterScreenshot(ip)
        return {
            fileName: printerScreenshotFileName
        }  
    },

    getBulkPrintersScreenshot: async (currentPrinter) => {
        currentPrinter = parseInt(currentPrinter)
        const countPrinters = PrinterRepository.getAllPrinters().length
        const finish = (currentPrinter == countPrinters)
        const tmpFiles = fs.readdirSync('screenshot/tmp')
        const tmpFilesQuantity = tmpFiles.length
        let finishPrinter = (currentPrinter === countPrinters) 
        let nextPrinter = finishPrinter ? null : (currentPrinter+1)
        let fileUrls = finishPrinter ? "google.com" : null
        const firstPrinter = 1
        if(tmpFilesQuantity && currentPrinter === firstPrinter)
        {
            tmpFiles.map(fileName => { 
                fs.unlinkSync(`./screenshot/tmp/${fileName}`)
            }) 
        }
        let responseObject = {
            totalPrinters: countPrinters,
            nextPrinter,
            fileUrls,
            currentPrinter,
            finish
        }
        return responseObject
    }
}

module.exports = PrintersUseCase