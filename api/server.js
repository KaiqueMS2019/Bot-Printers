const express = require('express')
const cors = require('cors')
const config = require('./core/config/config')
const loadRoutes = require('./routes')

const app = express()
app.use(cors())
loadRoutes(app)

app.listen(config.appPort, () => {
    console.log(`${config.appName} escutando na porta ${config.appPort}`)
})