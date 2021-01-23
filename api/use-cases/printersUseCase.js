const PrinterRepository = require('../repositories/printerRepository')
const PrinterService = require('../services/printerService')
const fs = require('fs')


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
        console.log(tmpFilesQuantity)

        return {
            totalPrinters: countPrinters,
            nextPrinter: (currentPrinter+1),
            currentPrinter,
            finish

        } 
        

    }

}

module.exports = PrintersUseCase