import React, { useState } from 'react'
import './printer.css'
import IndexUseCase from '../../../use-cases/index-page/index.use-case'
import fileDownloader from '../../../helpers/fileDownloader'
import generateFileName from '../../../helpers/generateFileName'
import appConfig from '../../../core/config'

const indexUseCase = IndexUseCase

const Printer = (props) => {

    const [downloadUrl, setDownloadUrl] = useState(null)

    const requestReport = (printerIp) => {
        indexUseCase.getPrinterReportUrl(printerIp)
        .then((payload) => {
            setDownloadUrl(payload)
        }).catch(() => {
            setDownloadUrl('error')
        })
    }

    const downloadReport = (printerIp) => {
        downloadUrl ? fileDownloader(`${appConfig.apiBaseUrl}printers/${encodeURIComponent(downloadUrl)}.jpg/download`, generateFileName('kaique', 'jpeg')) : requestReport(printerIp)
    }

    return(
        <div className="printer">
            <div className="icon"></div>
           <div className="name">{props.data.name} @ {props.data.ip}</div> 
           <div className= {`button ${(downloadUrl && downloadUrl !== 'error')  ? 'ready' : ''} ${(downloadUrl && downloadUrl === 'error') ? 'error' : ''}`}
            title={`Baixar relatório da impressora ${props.data.name} @ ${props.data.ip}`}
            onClick={()=>{downloadReport(props.data.ip)}}
            ></div>

        </div>
    )
}

export default Printer