import React, { useEffect, useState } from 'react'
import './body.css'
import Printer from '../../../pages/index/printer'
import IndexUseCase from '../../../use-cases/index-page/index.use-case'
import axios from 'axios'
import fileDownloader from '../../../helpers/fileDownloader'

const BUTON_STATES = {
    DOWNLOAD: 1,
    DOWNLOADING: 2,
    FINISHED: 3
}

const Body = () => {

    const indexUseCase = IndexUseCase
    const [printers, setPrinters] = useState([])
    const [butonState, setButonState] = useState(BUTON_STATES.DOWNLOAD)
    const [currentPrinterState, setCurrentPrinterState] = useState(1)

    const recursivePrintDownload = async (currentPrinter) => {
        return await axios.get(`http://localhost:3000/printers/all?currentPrinter=${currentPrinter}`)
    }

    const downloadZipFile = async () => {
        return  fileDownloader(`http://localhost:3000/printers/zip/file`, 'Printers.zip')
         
    }
    
    const downloadAllPrinters = async (currentPrinter = 1) => {
        console.log(currentPrinter)
       if(currentPrinter === 1){
           
           setButonState(BUTON_STATES.DOWNLOADING)
       }
        try {
            const response = await recursivePrintDownload(currentPrinter)
            const responseData = response.data
            const hasFinished = responseData.finish

            if (hasFinished) {
                setButonState(BUTON_STATES.FINISHED)
                return false
            }

            currentPrinter++
            setCurrentPrinterState(currentPrinter)
            await downloadAllPrinters(currentPrinter)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!printers.length) {
            indexUseCase.loadAllPrinters()
                .then((payload) => { setPrinters(payload) })
                .catch((err) => setPrinters('Error'))
        }
    })

    return (
        <div id="body">
            <div id="body-title">
                Printers
                {
                    (butonState === BUTON_STATES.DOWNLOAD) && <div onClick={() => {downloadAllPrinters()} }   id="btn-download-down"
                        title="Baixar todos os relatórios">Baixar Todos</div>
                }
                {
                    (butonState === BUTON_STATES.DOWNLOADING) && <div id="loading-bar-outside">
                        <div id="loading-bar-inside" style={{
                            width: `calc(${currentPrinterState}*100% /${printers.length})`
                        }}></div>
                        <div id="loading-bar-text" >{currentPrinterState}/{printers.length}</div>
                    </div>
                }
                {
                    (butonState === BUTON_STATES.FINISHED) && <div onClick={() => {downloadZipFile()} }   id="btn-download-down"
                        title="Baixar todos os relatórios">Baixar Arquivo</div>
                }

            </div>



            <div id="printers">

                {
                    (printers !== 'Error')
                        ?
                        printers.map(printer => <Printer data={printer} />)
                        :
                        <div id='printer-list-error'>Erro ao listar as impressoras</div>
                }

            </div>
        </div>
    )
}

export default Body