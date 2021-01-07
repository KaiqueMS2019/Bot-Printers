const express = require('express')
const cors = require('cors')
const config = require('./core/config/config')

const app = express()
app.use(cors())

app.get('/', (req, res, next) =>{
    res.send( {
        nome: 'Kaique',
        sexo: 'masculino'
    })
})
app.listen(config.appPort, () => {
    console.log(`${config.appName} escutando na porta ${config.appPort}`)
})