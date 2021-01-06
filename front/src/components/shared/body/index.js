import React, { useEffect, useState } from 'react'
import './body.css'
import Printer from '../../../pages/index/printer'
import IndexUseCase from '../../../use-cases/index-page/index.use-case'

const Body = () => {

    const indexUseCase = IndexUseCase
    const [printers, setPrinters] = useState([])

    useEffect(() => {
        if(!printers.length){
            indexUseCase.loadAllPrinters()
            .then((payload) => {setPrinters(payload)})
        }
    })

    return (
        <div id="body">
            <div id="body-title">
                Printers
                <div id="btn-download-down"
                title="Baixar todos os relatórios">Baixar Todos</div>
                </div>
            <div id="printers">
    
            {printers.map(printer =>  <Printer data={printer}/>)}

           </div>
        </div>
    )
}

export default Body