const PrinterRepository = require('../repositories/printerRepository')

const PrintersUseCase = {

    getListAllPrinters: () => {
        return PrinterRepository.getAllPrinters()
    }
}

module.exports = PrintersUseCase