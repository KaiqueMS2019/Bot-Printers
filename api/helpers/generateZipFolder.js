let zipFolder = require('zip-folder')

const generateZipFromFolder = async () => {
    const originFolder = './screenshot/tmp/'
    const destinyFolder = './screenshot/output/Printers.zip'
    return new Promise((resolve, reject) => {
        zipFolder(originFolder, destinyFolder, function(err) {
            if(err) {
                reject(err) 
            } 
            resolve(true)
        });
    })
}

module.exports = generateZipFromFolder