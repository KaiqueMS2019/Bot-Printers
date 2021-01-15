const express = require('express')
const PrintersRoute = express.Router()
const PrintersUseCase = require('../use-cases/printersUseCase')
const Errors = require('../core/errors')

PrintersRoute.get('/', (req, res, next) => {
    try {
        const allPrinters = PrintersUseCase.getListAllPrinters()
        res.send(allPrinters)
    } catch (error) {
        res.status(400)
        res.send(Errors.cannotGetAllPrinters)
    }
})

PrintersRoute.get('/all', async (req,res, next) => {

    const currentPrinter = req.query.currentPrinter
    const bulkPrinters = await PrintersUseCase.getBulkPrintersScreenshot(currentPrinter)
    res.send(bulkPrinters)

})

PrintersRoute.get('/:ip', async (req, res, next) => {
    try {
        console.log(`PrintersRoute :: get :: /:ip :: ${JSON.stringify(req.params)}`)
        const printerScreenshoot = await PrintersUseCase.getPrinterScreenshot(req.params.ip)
        res.send(printerScreenshoot)
    } catch (error) {
        res.status(400)
        res.send(Errors.cannotGetPrinterScreenshot)
    }
})

PrintersRoute.get('/:fileName/download', (req, res, next) => {
   try {
        const fileName = (req.params.fileName) 
        const file = `${__dirname}/../screenshot/${fileName}`
        res.download(file)
   } catch (error) {
        res.status(400)
        res.send(Errors.cannotDownloadThisFile)
   }

})

module.exports = PrintersRoute