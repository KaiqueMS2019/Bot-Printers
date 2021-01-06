import Axios from 'axios'
import FileDownload from 'js-file-download'

const fileDownloader = (url, fileName) => {
    Axios.get(url, {
        responseType: 'blob'
    }).then((respose) => FileDownload(respose.data, fileName))
}
export default fileDownloader