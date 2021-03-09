import React, { useEffect, useState } from 'react'
import './body.css'
import Printer from '../../../pages/index/printer'
import IndexUseCase from '../../../use-cases/index-page/index.use-case'
import axios from 'axios'

const Body = () => {

    const indexUseCase = IndexUseCase
    const [printers, setPrinters] = useState([])
    const [currentPrinterState, setCurrentPrinterState] = useState(1)

    const recursivePrintDownload = async (currentPrinter) => {
        return await axios.get(`http://localhost:3000/printers/all?currentPrinter=${currentPrinter}`)
    }

    const downloadAllPrinters = async (currentPrinter = 1) => {
        console.log(currentPrinter)
        try {
            const response = await recursivePrintDownload(currentPrinter)
            const responseData = response.data
            const hasFinished = responseData.finish

            if (hasFinished) {
                alert("acabou")
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
            downloadAllPrinters()
            indexUseCase.loadAllPrinters()
                .then((payload) => { setPrinters(payload) })
                .catch((err) => setPrinters('Error'))
        }
    })

    return (
        <div id="body">
            <div id="body-title">
                Printers
                {/* <div id="btn-download-down"
                    title="Baixar todos os relatórios">Baixar Todos</div>*/}
                <div id="loading-bar-outside">
                    <div id="loading-bar-inside" style={{
                        width: `calc(${currentPrinterState}*100% /${printers.length})`
                    }}></div>
                    <div id="loading-bar-text" >{currentPrinterState}/{printers.length}</div>
                </div>
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