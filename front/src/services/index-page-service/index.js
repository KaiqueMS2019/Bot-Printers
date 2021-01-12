import Axios from 'axios'
import appConfig from '../../core/config'
const IndexService = {

    loadAllPrinters: async () => {
        return Axios.get(`${appConfig.apiBaseUrl}printers`).then((response) => response.data)
    },

    getPrinterReportUrl: async (printerIp) => {
        return Axios.get(`${appConfig.apiBaseUrl}printers/${encodeURIComponent(printerIp)}`).then((response) => response.data.fileName)
    },

    downloadReportFile: async (fileName) => {
        return Axios.get(`${appConfig.apiBaseUrl}printers/${encodeURIComponent(fileName)}/download`).then((response) => response.data.fileName)
    }


}

export default IndexService