const PrinterRepository = require('../repositories/printerRepository')
const PrinterService = require('../services/printerService')
const generateZipFromFolder = require('../helpers/generateZipFolder')
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
        const allPrinters = PrinterRepository.getAllPrinters()
        const countPrinters = allPrinters.length
        const finish = (currentPrinter == countPrinters)
        let tmpFiles = fs.readdirSync('screenshot/tmp')
        const tmpFilesQuantity = tmpFiles.length
        const firstPrinter = 1

        let finishPrinter = (currentPrinter === countPrinters) 
        let nextPrinter = finishPrinter ? null : (currentPrinter+1)
        if(tmpFilesQuantity && currentPrinter === firstPrinter){
            tmpFiles.map(fileName => { 
                fs.unlinkSync(`./screenshot/tmp/${fileName}`)
            })  
        }

        await PrinterService.getPrinterScreenshot(allPrinters[(currentPrinter-1)].ip, true)

        if(finishPrinter){
           tmpFiles = fs.readdirSync('screenshot/tmp')
            await generateZipFromFolder()
            tmpFiles.map(fileName => { 
                fs.unlinkSync(`./screenshot/tmp/${fileName}`)
            })  
        }

        let responseObject = {
            totalPrinters: countPrinters,
            nextPrinter,
            currentPrinter,
            finish
        }
        return responseObject
    }
}

module.exports = PrintersUseCase