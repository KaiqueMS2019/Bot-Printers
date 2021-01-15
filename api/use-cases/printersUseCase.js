const PrinterRepository = require('../repositories/printerRepository')
const PrinterService = require('../services/printerService')


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

        return {
            totalPrinters: countPrinters,
            currentPrinter,
            finish

        } 
        

    }

}

module.exports = PrintersUseCase