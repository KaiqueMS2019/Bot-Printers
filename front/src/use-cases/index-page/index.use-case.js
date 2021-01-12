import IndexServiceMock from '../../services/index-page-service/index.mock'
import IndexService from '../../services/index-page-service/index'
import appConfig from '../../core/config'

const indexService = (appConfig.useMocks) ? IndexServiceMock : IndexService

const IndexUseCase = {

    loadAllPrinters: async () => {
        return indexService.loadAllPrinters()
    },

    getPrinterReportUrl: async (printerIp) => {
        return indexService.getPrinterReportUrl(printerIp)
    },

    downloadReportFile: async (fileName) => {
        return indexService.downloadReportFile(fileName)
    }
}

export default IndexUseCase