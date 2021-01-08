const PrintersRoute = require('./printersRoute')

const routes = [
    {
        PATH: '/printers', HANDLER: PrintersRoute
    }
]

module.exports = (app) => {
    routes.map((route) => {
        console.log(`[ROUTE] :: ${route.PATH}`)
        app.use(route.PATH, route.HANDLER)
    })
}