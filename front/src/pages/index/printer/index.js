import React, { useState, useCallback } from 'react'
import './printer.css'
import IndexUseCase from '../../../use-cases/index-page/index.use-case'
import { useStatusDownload } from '../../../hooks/StatusDownload';


const indexUseCase = IndexUseCase

const Printer = (props) => {

    const { statusDownload, setStatusDownload } = useStatusDownload();

    const [downloadUrl, setDownloadUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const updateDownload = useCallback(() => {
        setStatusDownload(statusDownload + 1);
    },[setStatusDownload, statusDownload])
    const requestReport = useCallback(async (printerIp) => {
        setIsLoading(true)
        await indexUseCase.getPrinterReportUrl(printerIp)
        .then((payload) => {
            setDownloadUrl(payload)
            updateDownload();
        }).catch(() => {
            setDownloadUrl('error')
        }).finally(() => {
            setIsLoading(false)
        })
    },[updateDownload])


    const downloadReport = useCallback((printerIp) => {
        downloadUrl ? indexUseCase.downloadReportFile(downloadUrl)  : requestReport(printerIp)
    },[downloadUrl, requestReport]);

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