const generateFileName = (printerIp, extension) => {
    return (printerIp + Date.now().valueOf()).split('.').join('_') + '.' + extension 
}
export default generateFileName