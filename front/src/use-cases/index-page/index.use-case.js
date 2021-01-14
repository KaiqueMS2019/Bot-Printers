import IndexServiceMock from '../../services/index-page-service/index.mock'
import IndexService from '../../services/index-page-service/index'
import appConfig from '../../core/config'
import fileDownloader from '../../helpers/fileDownloader'
import generateFileName from '../../helpers/generateFileName'

const indexService = (appConfig.useMocks) ? IndexServiceMock : IndexService

const IndexUseCase = {

    loadAllPrinters: async () => {
        return indexService.loadAllPrinters()
    },

    getPrinterReportUrl: async (printerIp) => {
        return indexService.getPrinterReportUrl(printerIp)
    },

    downloadReportFile: async (downloadUrl) => {
        return fileDownloader(`${appConfig.apiBaseUrl}printers/${encodeURIComponent(downloadUrl)}.jpg/download`, generateFileName(`${appConfig.enterPriseName} - `, 'png'))
    }

}

export default IndexUseCase