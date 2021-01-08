const express = require('express')
const PrintersRoute = express.Router()
const PrintersUseCase = require('../use-cases/printersUseCase')

PrintersRoute.get('/', (req, res, next) => {
    res.send(PrintersUseCase.getListAllPrinters())
})


module.exports = PrintersRoute