const express = require('express')
const PrintersRoute = express.Router()
const PrintersUseCase = require('../use-cases/printersUseCase')

PrintersRoute.get('/', (req, res, next) => {
    res.send(PrintersUseCase.getListAllPrinters())
})

PrintersRoute.get('/:ip', async (req, res, next) => {
    console.log(`PrintersRoute :: get :: /:ip :: ${req.params}`)
    res.send(await PrintersUseCase.getPrinterScreenshot(req.params.ip))
})

PrintersRoute.get('/:fileName/download', (req, res, next) => {
    const fileName = (req.params.fileName) 
    const file = `${__dirname}/../screenshot/${fileName}`
    res.download(file)
})

module.exports = PrintersRoute