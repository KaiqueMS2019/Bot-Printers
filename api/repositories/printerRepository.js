const data = require('../data/printers.json')

const PrinterRepository = {
    
        getAllPrinters: () => {
            console.log(`PrinterRepository :: getAllPrinters`)
            return data.printers
        }
} 

module.exports = PrinterRepository