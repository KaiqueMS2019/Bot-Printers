import React, { useState } from 'react'
import './printer.css'
import IndexUseCase from '../../../use-cases/index-page/index.use-case'
import fileDownloader from '../../../helpers/fileDownloader'
import generateFileName from '../../../helpers/generateFileName'
import appConfig from '../../../core/config'

const indexUseCase = IndexUseCase

const Printer = (props) => {

    const [downloadUrl, setDownloadUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const requestReport = (printerIp) => {
        setIsLoading(true)
        indexUseCase.getPrinterReportUrl(printerIp)
        .then((payload) => {
            setDownloadUrl(payload)
        }).catch(() => {
            setDownloadUrl('error')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const downloadReport = (printerIp) => {
        downloadUrl ? indexUseCase.downloadReportFile(downloadUrl)  : requestReport(printerIp)
    }

    return(
        <div className="printer"  title={`Impressora ${props.data.name} @ ${props.data.ip}`}>
            <div className="icon"></div>
           <div className="name">{props.data.name}</div> 
           <div className= {
               `button 
                ${(!isLoading && downloadUrl && downloadUrl !== 'error')  ? 'ready' : ''} 
                ${(!isLoading && downloadUrl && downloadUrl === 'error') ? 'error' : ''}
                ${(isLoading ? 'loading' : '')}
               `
            }
            onClick={()=>{downloadReport(props.data.ip)}}
            ></div>

        </div>
    )
}

export default Printer