const worksheet = require('./worksheet')

function init(config){
    const {credentials,languages,sheet,output_dir} = config
    worksheet.setCredential(credentials)
    worksheet.setLanguage(languages)
    worksheet.setSheet(sheet)
    worksheet.setDIR(output_dir)
}

function readSheet(namespace=null){
    worksheet.readSheet(namespace)
}

module.exports = {init,readSheet}