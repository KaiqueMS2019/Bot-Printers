const PrinterRepository = require('../repositories/printerRepository')
const PrinterService = require('../services/printerService')

const PrintersUseCase = {

    getListAllPrinters: () => {
        return PrinterRepository.getAllPrinters()
    },

    getPrinterScreenshot: async (ip) => {
        console.log(`PrintersUseCase :: getPrinterScreenshot :: ${ip}`)
        const printerScreenshotFileName = await PrinterService.getPrinterScreenshot(ip)
        return {
            fileName: printerScreenshotFileName
        }
    }

}

module.exports = PrintersUseCase