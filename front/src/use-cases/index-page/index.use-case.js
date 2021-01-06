import IndexServiceMock from '../../services/index-page-service/index.mock'

const indexService = IndexServiceMock

const IndexUseCase = {

    loadAllPrinters: async () => {
        return indexService.loadAllPrinters()
    },

    getPrinterReportUrl: async (printerIp) => {
        return indexService.getPrinterReportUrl(printerIp)
    }
}

export default IndexUseCase