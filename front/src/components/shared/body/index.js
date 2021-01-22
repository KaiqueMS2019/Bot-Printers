import React, { useEffect, useState } from 'react'
import './body.css'
import Printer from '../../../pages/index/printer'
import IndexUseCase from '../../../use-cases/index-page/index.use-case'
import { useStatusDownload } from '../../../hooks/StatusDownload';

const Body = () => {
    const { statusDownload } = useStatusDownload();
    const indexUseCase = IndexUseCase
    const [printers, setPrinters] = useState([])

    useEffect(() => {
        if(!printers.length){
            indexUseCase.loadAllPrinters()
            .then((payload) => {setPrinters(payload)})
            .catch((err) => setPrinters('Error'))
        }
    })

    return (
        <div id="body">
            <div id="body-title">
                Printers
                <div id="btn-download-down"
                title="Baixar todos os relatórios">Baixar Todos {statusDownload}/{printers.length}</div>
                </div>
            <div id="printers">
    
            { 
                (printers !== 'Error') 
                ? 
                printers.map(printer =>  <Printer  data={printer}/>)
                :
                <div id='printer-list-error'>Erro ao listar as impressoras</div>
            }

           </div>
        </div>
    )
}

export default Body