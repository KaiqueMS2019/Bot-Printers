import React, { useState } from 'react'
import './printer.css'
import IndexUseCase from '../../../use-cases/index-page/index.use-case'
import fileDownloader from '../../../helpers/fileDownloader'
import generateFileName from '../../../helpers/generateFileName'

const indexUseCase = IndexUseCase

const Printer = (props) => {

    const [downloadUrl, setDownloadUrl] = useState(null)

    const requestReport = (printerIp) => {
        indexUseCase.getPrinterReportUrl(printerIp)
        .then((payload) => {
            setDownloadUrl(payload)
        })
    } 

    const downloadReport = (printerIp) => {
        if(downloadUrl){
            fileDownloader(downloadUrl, generateFileName(printerIp, 'jpeg'))
        } else {
            requestReport(printerIp)
        }
    }

    return(
        <div className="printer">
            <div className="icon"></div>
           <div className="name">{props.data.name} @ {props.data.ip}</div> 
           <div className= {`button ${downloadUrl ? 'ready' : ''}`}
            title={`Baixar relatório da impressora ${props.data.name} @ ${props.data.ip}`}
            onClick={()=>{downloadReport(props.data.ip)}}
            ></div>

        </div>
    )
}

export default Printer