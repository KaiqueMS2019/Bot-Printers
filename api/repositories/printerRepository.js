const data = require('../data/printers.json')

const PrinterRepository = {

        getAllPrinters: () => {
            return data.printers
        }
}

module.exports = PrinterRepository