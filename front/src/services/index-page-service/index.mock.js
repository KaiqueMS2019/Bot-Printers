const IndexServiceMock = {

    loadAllPrinters: async () => {

        const payload = [
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
            {name: 'Backup', ip:'192.168.0.3',},
        ]

            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(payload)
                }, 300)
            })

    },

    getPrinterReportUrl: async (printerIp) => {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve('https://lh3.googleusercontent.com/TVFBBj2ATi2_Q3IuOzFdeDl-g7sS5kjlQDZZ9vS-IPnvi3X94I0Qsu8cEbvm9BxAtFcvFrDm3v40dhM7gFfodnszlw=w640-h400-e365-rj-sc0x00ffffff')
            }, 300)
    })}

} 
    
export default IndexServiceMock